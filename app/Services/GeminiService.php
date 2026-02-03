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
                    
                    // More robust JSON extraction
                    if (preg_match('/\{[\s\S]*\}/', $text, $matches)) {
                        $text = $matches[0];
                    }
                    
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

        // helper for timeline (REFINED)
        $toTimeline = function($timeline) {
            if (!is_array($timeline)) return (string)$timeline;
            $out = "";
            foreach ($timeline as $idx => $t) {
                $faseNum = $idx + 1;
                $out .= "### Fase $faseNum – " . ($t['phase'] ?? 'Tahap Pengembangan') . " (" . ($t['duration'] ?? '-') . ")\n";
                $out .= ($t['objective'] ?? 'Tujuan fase ini adalah memastikan kelancaran implementasi.') . "\n\n";
                if (isset($t['activities']) && is_array($t['activities'])) {
                    $out .= "**Aktivitas Utama:**\n";
                    foreach ($t['activities'] as $act) {
                        $out .= "- " . $act . "\n";
                    }
                }
                $out .= "\n";
            }
            return $out;
        };

        // helper for investment (REFINED)
        $toInvestment = function($inv) {
            if (!is_array($inv)) return (string)$inv;
            $out = ($inv['narrative'] ?? "Estimasi investasi proyek ini mencakup pengembangan sistem inti dan implementasi modul utama.") . "\n\n";
            
            if (isset($inv['covered_scope']) && is_array($inv['covered_scope'])) {
                $out .= "**Rincian Investasi Proyek:**\n";
                foreach ($inv['covered_scope'] as $item) {
                    $out .= "- " . $item . "\n";
                }
                $out .= "\n";
            }

            $out .= "**Total Estimasi Investasi Proyek:**\n";
            $out .= "IDR " . ($inv['total_value'] ?? '0') . "\n\n";
            $out .= "Nilai investasi ini merupakan biaya pengembangan awal sistem. Skema dukungan dan pengembangan lanjutan dapat dibahas secara terpisah sesuai kebutuhan operasional.";
            return $out;
        };

        return [
            'title' => $decoded['cover']['title'] ?? $decoded['title'] ?? ('Proposal ' . ($data['client_name'] ?? 'Klien')),
            'executive_summary' => $decoded['executive_summary']['content'] ?? $decoded['executive_summary'] ?? '',
            'problem_analysis' => $toList($decoded['background_problem']['points'] ?? $decoded['problem_analysis'] ?? []),
            'project_objectives' => $toList($decoded['project_goals']['goals'] ?? $decoded['project_objectives']['goals'] ?? $decoded['project_goals'] ?? $decoded['project_objectives'] ?? []),
            'solutions' => $toSolutions($decoded['solutions'] ?? []),
            'scope_of_work' => $toList($decoded['scope_of_work']['deliverables'] ?? $decoded['scope_of_work'] ?? []),
            'system_walkthrough' => $decoded['system_flow']['description'] ?? $decoded['system_walkthrough'] ?? '',
            'timeline' => $toTimeline($decoded['timeline'] ?? []),
            'investment' => $toInvestment($decoded['investment'] ?? []),
            'roi_impact' => $toList($decoded['impact_roi']['impact_points'] ?? $decoded['roi_impact'] ?? []),
            'value_add' => $toList($decoded['value_proposition']['points'] ?? $decoded['value_add'] ?? []),
            'closing_cta' => $decoded['closing']['call_to_action'] ?? $decoded['closing_cta'] ?? '',
            'pricing' => $decoded['investment']['total_value'] ?? ($data['total_value'] ? number_format($data['total_value'], 0, ',', '.') : '0'),
            'raw_json' => $decoded 
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
        $deadline = $data['deadline'] ?? '14 Hari';

        return '🔹 PROMPT EXPORT PROPOSAL PROFESIONAL (BUSINESS-FOCUSED)

Anda adalah AI Proposal Generator profesional milik Dark and Bright.

Tugas Anda adalah merevisi dan menghasilkan proposal proyek yang lebih tajam secara bisnis, bukan sekadar deskriptif teknis.

🎯 PRINSIP KONTEN (WAJIB DITERAPKAN):

1. **Ringkasan Eksekutif** (Maksimal 1 halaman):
   - Fokus HANYA pada: Masalah utama klien, Solusi inti, Dampak bisnis.
   - Gunakan bahasa manajemen dan pemilik usaha.
   - Hindari istilah teknis berlebihan.
   - Contoh: "Sistem ini mengurangi waktu proses pendaftaran hingga 70%, meningkatkan kapasitas layanan tanpa menambah SDM."

2. **Tujuan Proyek**:
   - Gunakan bahasa tegas dan konsisten.
   - Hindari kata: "potensi", "diharapkan", "estimasi" (kecuali di bagian ROI).
   - Contoh SALAH: "Diharapkan dapat meningkatkan efisiensi."
   - Contoh BENAR: "Meningkatkan efisiensi operasional sebesar 40%."

3. **Solusi dan Modul**:
   - Setiap solusi HARUS menjelaskan manfaat langsung bagi operasional dan pengambilan keputusan klien.
   - Format: "Modul X → Mengatasi masalah Y → Dampak bisnis Z."

4. **Timeline dan Ruang Lingkup**:
   - Tetap realistis dan profesional.
   - Jangan membuat janji berlebihan.
   - Gunakan fase bertahap yang jelas.

5. **Estimasi Investasi**:
   - Framing sebagai "investasi bertahap dan fleksibel", BUKAN "biaya".
   - Contoh: "Investasi ini mencakup pengembangan sistem inti yang dapat dikembangkan secara modular sesuai kebutuhan bisnis."

6. **ROI**:
   - Disajikan secara ilustratif dan logis.
   - Tanpa klaim finansial mutlak.
   - Contoh: "Berdasarkan pengalaman proyek serupa, sistem ini dapat mengurangi beban operasional hingga 50% dalam 6 bulan pertama."

7. **Gaya Bahasa**:
   - Formal-profesional, rapi, meyakinkan.
   - Fokus pada: Nilai bisnis, Efisiensi, Mitigasi risiko, Kredibilitas klien.

🔹 STRUKTUR OUTPUT (JSON WAJIB):
{
  "cover": {
    "title": "PROPOSAL PENGEMBANGAN ...",
    "client_name": "' . $client . '",
    "year": "' . date('Y') . '"
  },
  "executive_summary": {
    "content": "Ringkasan eksekutif maksimal 1 halaman. Fokus pada masalah bisnis, solusi inti, dan dampak terukur. Hindari jargon teknis."
  },
  "background_problem": {
    "points": ["Masalah bisnis 1 (bukan teknis)", "Masalah bisnis 2"]
  },
  "project_goals": {
    "goals": ["Tujuan tegas 1 (tanpa kata \'diharapkan\')", "Tujuan tegas 2"]
  },
  "solutions": [
    {
      "module_name": "Nama Modul",
      "problem_solved": "Masalah spesifik yang teratasi",
      "business_benefit": "Dampak langsung bagi operasional dan keputusan bisnis"
    }
  ],
  "scope_of_work": {
    "deliverables": ["Deliverable 1 (dengan manfaat bisnis)", "Deliverable 2"]
  },
  "system_flow": {
    "description": "Penjelasan alur sistem dalam bahasa bisnis, bukan diagram teknis. Fokus pada bagaimana sistem mempermudah proses bisnis."
  },
  "timeline": [
    {
      "phase": "Nama Fase",
      "objective": "Tujuan fase ini untuk bisnis klien",
      "activities": ["Aktivitas 1", "Aktivitas 2"],
      "duration": "Durasi realistis"
    }
  ],
  "investment": {
    "total_value": "' . number_format($total, 0, ',', '.') . '",
    "covered_scope": ["Ruang lingkup investasi 1", "Ruang lingkup investasi 2"],
    "narrative": "Investasi ini dirancang secara bertahap dan fleksibel, memungkinkan pengembangan modular sesuai prioritas bisnis."
  },
  "impact_roi": {
    "impact_points": ["Dampak terukur 1 (ilustratif, bukan klaim mutlak)", "Dampak terukur 2"]
  },
  "value_proposition": {
    "points": ["Nilai tambah 1 (fokus kredibilitas dan mitigasi risiko)", "Nilai tambah 2"]
  },
  "closing": {
    "call_to_action": "Ajakan profesional untuk diskusi lanjutan dan kolaborasi strategis."
  }
}

📊 DATA MASUKAN:
Klien: ' . $client . '
Industri: ' . $industry . '
Masalah Utama: ' . $problem . '
Tipe Proyek: ' . $type . '
Target Selesai: ' . $deadline . '
Nilai Investasi Estimasi: IDR ' . number_format($total, 0, ',', '.') . '

⚠️ PENTING:
- Jika data klien tidak lengkap, gunakan asumsi logis bisnis umum.
- Jangan menulis "sebagai AI" atau "saya sebagai AI".
- Fokus pada nilai bisnis, bukan fitur teknis.
- Gunakan data kuantitatif jika memungkinkan (contoh: "mengurangi waktu proses 70%").
- Hindari kalimat pasif dan ambigu.';
    }
}
