<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/';
    protected $models = [
        'gemini-2.0-flash',
        'gemini-1.5-flash-latest',
        'gemini-flash-latest',
        'gemini-pro-latest',
        'gemini-2.0-flash-lite-001'
    ];

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
    }

    public function generateProposal($data)
    {
        if (!$this->apiKey) {
            return "Error: Gemini API Key is not configured in .env (GEMINI_API_KEY).";
        }

        $prompt = $this->buildPrompt($data);
        $lastError = 'Unknown error';

        foreach ($this->models as $model) {
            try {
                $endpoint = $this->baseUrl . $model . ':generateContent?key=' . $this->apiKey;
                
                $response = Http::post($endpoint, [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt]
                            ]
                        ]
                    ],
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'topK' => 40,
                        'topP' => 0.95,
                        'maxOutputTokens' => 4096,
                    ]
                ]);

                if ($response->successful()) {
                    $result = $response->json();
                    $text = $result['candidates'][0]['content']['parts'][0]['text'] ?? '';
                    
                    // Clean up markdown code blocks if the AI includes them
                    $text = preg_replace('/```json\s?|\s?```/', '', $text);
                    
                    $decoded = json_decode($text, true);
                    
                    if (is_array($decoded)) {
                        return $this->mapOutputToFrontend($decoded, $data);
                    }

                    return $this->getEmptyProposal($data, $text);
                }

                $lastError = $response->json()['error']['message'] ?? 'Unknown error';
                Log::warning("Gemini model $model failed: $lastError. Trying next...");

            } catch (\Exception $e) {
                $lastError = $e->getMessage();
                Log::error("Gemini Service Exception with $model: " . $lastError);
            }
        }

        return $this->getErrorProposal($lastError);
    }

    protected function mapOutputToFrontend($decoded, $data)
    {
        // helper to convert array to markdown list
        $toList = function($arr) {
            if (!is_array($arr)) return (string)$arr;
            return implode("\n", array_map(fn($item) => "- " . $item, $arr));
        };

        // helper for solutions
        $toSolutions = function($solutions) {
            if (!is_array($solutions)) return (string)$solutions;
            $out = "";
            foreach ($solutions as $s) {
                $out .= "### " . ($s['module_name'] ?? 'Modul') . "\n";
                $out .= "**Masalah Teratasi:** " . ($s['problem_solved'] ?? '-') . "\n";
                $out .= "**Manfaat Bisnis:** " . ($s['business_benefit'] ?? '-') . "\n\n";
            }
            return $out . "Solusi dapat dikembangkan bertahap sesuai kebutuhan.";
        };

        // helper for timeline
        $toTimeline = function($timeline) {
            if (!is_array($timeline)) return (string)$timeline;
            $out = "";
            foreach ($timeline as $t) {
                $out .= "- **" . ($t['phase'] ?? 'Fase') . "**: " . ($t['duration'] ?? '-') . "\n";
            }
            return $out;
        };

        // investment mapping (using existing logic for now since it's missing in new prompt)
        $total = $data['total_value'] ?? 0;
        $type = $data['project_type'] ?? 'Website Bisnis';
        $duration = $data['contract_duration'] ?? 6;
        $setupPct = ($type == 'Landing Page' ? 0.4 : ($type == 'Website Bisnis' ? 0.3 : ($type == 'Dashboard / Sistem' ? 0.2 : 0.15)));
        $setupCost = number_format($total * $setupPct, 0, ',', '.');
        $maintMonthly = number_format(($total * (1 - $setupPct)) / $duration, 0, ',', '.');
        $totalFmt = number_format($total, 0, ',', '.');

        $investment = "Sajikan rincian berikut dalam narasi profesional:\n";
        $investment .= "* Setup Awal (Development): IDR $setupCost (Sekali bayar).\n";
        $investment .= "* Maintenance & Support: IDR $maintMonthly / bulan selama $duration bulan.\n";
        $investment .= "* Total Nilai Kontrak: IDR $totalFmt.\n\n";
        $investment .= "Estimasi investasi ini bersifat indikatif dan dapat disesuaikan berdasarkan kebutuhan final serta hasil diskusi lanjutan.";

        return [
            'title' => $decoded['cover']['title'] ?? ('Proposal ' . ($data['client_name'] ?? 'Klien')),
            'executive_summary' => $decoded['executive_summary']['content'] ?? '',
            'problem_analysis' => $toList($decoded['background_problem']['points'] ?? []),
            'project_objectives' => $toList($decoded['project_goals']['goals'] ?? []),
            'solutions' => $toSolutions($decoded['solutions'] ?? []),
            'scope_of_work' => $toList($decoded['scope_of_work']['deliverables'] ?? []),
            'system_walkthrough' => $decoded['system_flow']['description'] ?? '',
            'timeline' => $toTimeline($decoded['timeline'] ?? []),
            'investment' => $investment,
            'roi_impact' => $toList($decoded['impact_roi']['impact_points'] ?? []),
            'value_add' => $toList($decoded['value_proposition']['points'] ?? []),
            'closing_cta' => $decoded['closing']['call_to_action'] ?? '',
            'pricing' => $totalFmt,
            'raw_json' => $decoded // Keep original for future use
        ];
    }

    protected function getEmptyProposal($data, $text)
    {
        return [
            'title' => 'Proposal ' . ($data['client_name'] ?? 'Klien'),
            'executive_summary' => (string)$text,
            'problem_analysis' => '',
            'project_objectives' => '',
            'solutions' => '',
            'scope_of_work' => '',
            'system_walkthrough' => '',
            'timeline' => '',
            'investment' => '',
            'roi_impact' => '',
            'value_add' => '',
            'closing_cta' => '',
            'pricing' => isset($data['total_value']) ? number_format($data['total_value'], 0, ',', '.') : ''
        ];
    }

    protected function getErrorProposal($lastError)
    {
        return [
            'title' => 'Error Generation',
            'executive_summary' => "Gemini API Error (Confirmed models failed): " . $lastError,
            'problem_analysis' => '',
            'project_objectives' => '',
            'solutions' => '',
            'scope_of_work' => '',
            'system_walkthrough' => '',
            'timeline' => '',
            'investment' => '',
            'roi_impact' => '',
            'value_add' => '',
            'closing_cta' => '',
            'pricing' => ''
        ];
    }

    protected function buildPrompt($data)
    {
        $client = $data['client_name'] ?? 'Klien';
        $industry = $data['industry'] ?? 'Industri Umum';
        $problem = $data['problem_statement'] ?? 'Tidak disebutkan';
        $type = $data['project_type'] ?? 'Website Bisnis';
        $total = $data['total_value'] ?? 0;
        $duration = $data['contract_duration'] ?? 6;
        $deadline = $data['deadline'] ?? '14 Hari';

        return '🧠 SYSTEM PROMPT
AI Agent – Proposal Visual Generator

Anda adalah AI Agent internal Dark and Bright yang bertugas menghasilkan PROPOSAL BISNIS DALAM BENTUK HALAMAN WEB SIAP EXPORT PDF.
PERAN ANDA BUKAN DESAINER BEBAS, tetapi PENGISI KONTEN TERSTRUKTUR ke dalam TEMPLATE VISUAL YANG SUDAH DITENTUKAN.

1️⃣ ATURAN UTAMA (WAJIB DIPATUHI)
- Proposal HARUS berbentuk struktur halaman web (HTML logic / section-based)
- SETIAP BAB = 1 SECTION TERPISAH
- TIDAK BOLEH mengatur warna, font, atau layout kompleks
- TIDAK BOLEH menulis deskripsi desain
- Fokus pada ISI & STRUKTUR KONTEN

📌 AI tidak mendesain, AI mengisi.

2️⃣ STRUKTUR OUTPUT (INI WAJIB)
Output HARUS mengikuti format JSON berikut:
{
  "cover": {
    "title": "PROPOSAL PENGEMBANGAN ...",
    "client_name": "' . $client . '",
    "year": "' . date('Y') . '"
  },
  "executive_summary": {
    "content": "..."
  },
  "background_problem": {
    "points": ["point 1", "point 2"]
  },
  "project_goals": {
    "goals": ["goal 1", "goal 2"]
  },
  "solutions": [
    {
      "module_name": "...",
      "problem_solved": "...",
      "business_benefit": "..."
    }
  ],
  "scope_of_work": {
    "deliverables": ["deliverable 1", "deliverable 2"]
  },
  "system_flow": {
    "description": "..."
  },
  "timeline": [
    {
      "phase": "...",
      "duration": "..."
    }
  ],
  "impact_roi": {
    "impact_points": ["point 1", "point 2"]
  },
  "value_proposition": {
    "points": ["point 1", "point 2"]
  },
  "closing": {
    "call_to_action": "..."
  }
}

📌 DILARANG keluar dari struktur ini.

3️⃣ LOGIKA VISUAL YANG HARUS DIPAHAMI AI
- Setiap key di atas = 1 halaman / section visual
- Panjang konten harus proporsional untuk 1 halaman proposal
- Gunakan bahasa bisnis profesional Indonesia
- Tidak terlalu panjang dan tidak terlalu abstrak

4️⃣ GAYA BAHASA (WAJIB)
- Bahasa Indonesia formal-profesional
- Fokus ke klien, tidak menjual berlebihan, tidak teknis berlebihan.

5️⃣ DATA MASUKAN:
Klien: ' . $client . '
Industri: ' . $industry . '
Masalah Utama: ' . $problem . '
Tipe Proyek: ' . $type . '
Target Selesai: ' . $deadline . '
Nilai Investasi: IDR ' . number_format($total, 0, ',', '.') . '

Jika data klien tidak lengkap, gunakan asumsi logis bisnis umum.
Jangan menambahkan disclaimer panjang. Jangan menulis "sebagai AI".';
    }
}
