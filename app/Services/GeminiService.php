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
        // helper to convert array to HTML list with proper formatting
        $toList = function($arr) {
            if (!is_array($arr)) {
                $text = (string)$arr;
                // Convert markdown bold (**text**) to HTML <strong>
                $text = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $text);
                
                // If it looks like a list (multi-line), convert it
                if (str_contains($text, "\n")) {
                    $lines = explode("\n", $text);
                    $out = "<ul>";
                    foreach ($lines as $line) {
                        $line = trim($line);
                        if (empty($line)) continue;
                        
                        // Strip hyphens, bullets, arrows, or other common list symbols
                        $cleanedItem = preg_replace('/^[\-\*\•\→\⇒\>\d\.]+\s*/', '', $line);
                        $out .= "<li>" . trim($cleanedItem) . "</li>";
                    }
                    return $out . "</ul>";
                }

                // Wrap in paragraphs if not a list
                $paragraphs = explode("\n\n", $text);
                return implode("", array_map(fn($p) => "<p>" . trim($p) . "</p>", array_filter($paragraphs)));
            }
            
            $out = "<ul>";
            foreach ($arr as $item) {
                // Convert markdown bold to HTML
                $item = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $item);
                $out .= "<li>" . $item . "</li>";
            }
            $out .= "</ul>";
            return $out;
        };

        // helper for solutions
        $toSolutions = function($solutions) {
            if (!is_array($solutions)) {
                $text = (string)$solutions;
                $text = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $text);
                $paragraphs = explode("\n\n", $text);
                return implode("", array_map(fn($p) => "<p>" . trim($p) . "</p>", array_filter($paragraphs)));
            }
            $out = "";
            foreach ($solutions as $s) {
                $out .= "<h3>" . ($s['module_name'] ?? 'Modul') . "</h3>\n";
                $problem = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $s['problem_solved'] ?? '-');
                $benefit = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $s['business_benefit'] ?? '-');
                $out .= "<p><strong>Masalah Teratasi:</strong> " . $problem . "</p>\n";
                $out .= "<p><strong>Manfaat Bisnis:</strong> " . $benefit . "</p>\n";
            }
            return $out . "<p>Solusi dapat dikembangkan bertahap sesuai kebutuhan.</p>";
        };

        // helper for timeline (REFINED)
        $toTimeline = function($timeline) {
            if (!is_array($timeline)) return (string)$timeline;
            $out = "";
            foreach ($timeline as $idx => $t) {
                $faseNum = $idx + 1;
                // Clean phase name (remove "Fase X:" prefix if AI includes it)
                $phaseName = $t['phase'] ?? 'Tahap Pengembangan';
                $phaseName = preg_replace('/^Fase\s*\d+:\s*/i', '', $phaseName);
                
                $out .= "<h3>Fase $faseNum – " . $phaseName . " (" . ($t['duration'] ?? '-') . ")</h3>\n";
                $out .= "<p>" . ($t['objective'] ?? 'Tujuan fase ini adalah memastikan kelancaran implementasi.') . "</p>\n";
                if (isset($t['activities']) && is_array($t['activities'])) {
                    $out .= "<p><strong>Aktivitas Utama:</strong></p>\n";
                    $out .= "<ul>\n";
                    foreach ($t['activities'] as $act) {
                        $out .= "<li>" . $act . "</li>\n";
                    }
                    $out .= "</ul>\n";
                }
                $out .= "\n";
            }
            return $out;
        };

        // helper for investment (REFINED WITH FORMULA)
        $toInvestment = function($inv, $projectType, $totalValue) {
            if (!is_array($inv)) return (string)$inv;
            
            // Determine Setup/Maintenance split based on project type
            $splits = [
                'Landing Page' => ['setup' => 40, 'maintenance' => 60],
                'Website Bisnis' => ['setup' => 30, 'maintenance' => 70],
                'Dashboard / Sistem' => ['setup' => 20, 'maintenance' => 80],
                'Sistem Kompleks' => ['setup' => 15, 'maintenance' => 85],
            ];
            
            // Default to Website Bisnis if type not found
            $split = $splits[$projectType] ?? $splits['Website Bisnis'];
            
            // Calculate breakdown
            $setupCost = $totalValue * ($split['setup'] / 100);
            $maintenanceCost = $totalValue * ($split['maintenance'] / 100);
            $maintenanceMonthly = $maintenanceCost / 6; // Default 6 months
            
            $out = "<p>" . ($inv['narrative'] ?? "Investasi proyek ini dirancang untuk memberikan nilai bisnis maksimal dengan dukungan berkelanjutan.") . "</p>\n";
            
            $out .= "<p><strong>Rincian Investasi Proyek:</strong></p>\n";
            $out .= "<ul>\n";
            $out .= "<li><strong>Biaya Setup Awal</strong>: IDR " . number_format($setupCost, 0, ',', '.') . "<br><small>Mencakup pengembangan sistem inti, integrasi data, dan deployment awal.</small></li>\n";
            $out .= "<li><strong>Dukungan Stabilisasi (6 Bulan)</strong>: IDR " . number_format($maintenanceCost, 0, ',', '.') . "<br><small>Maintenance bulanan: IDR " . number_format($maintenanceMonthly, 0, ',', '.') . ". Mencakup monitoring, bug fixing, dan optimasi performa sistem.</small></li>\n";
            $out .= "</ul>\n";
            
            $out .= "<p><strong>Total Estimasi Investasi Proyek:</strong><br>\n";
            $out .= "<span style='font-size: 14pt; color: #2563eb; font-weight: bold;'>IDR " . number_format($totalValue, 0, ',', '.') . "</span></p>\n";
            $out .= "<p><small>Investasi ini merupakan paket lengkap yang mencakup pengembangan awal dan fase stabilisasi sistem. Dukungan lanjutan setelah periode 6 bulan dapat dibahas secara terpisah sesuai kebutuhan operasional.</small></p>";
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
            'investment' => $toInvestment($decoded['investment'] ?? [], $data['project_type'] ?? 'Website Bisnis', $data['total_value'] ?? 0),
            'roi_impact' => $toList($decoded['impact_roi']['impact_points'] ?? $decoded['roi_impact'] ?? []),
            'value_add' => $toList($decoded['value_proposition']['points'] ?? $decoded['value_add'] ?? []),
            'closing_cta' => $decoded['closing']['call_to_action'] ? ("<p>" . $decoded['closing']['call_to_action'] . "</p>") : '',
            'pricing' => $decoded['investment']['total_value'] ?? ($data['total_value'] ? number_format($data['total_value'], 0, ',', '.') : '0'),
            'raw_json' => $decoded 
        ];
    }

    protected function getEmptyProposal($data, $text)
    {
        // Generate investment breakdown even for empty/fallback proposals
        $projectType = $data['project_type'] ?? 'Website Bisnis';
        $totalValue = $data['total_value'] ?? 0;
        
        $splits = [
            'Landing Page' => ['setup' => 40, 'maintenance' => 60],
            'Website Bisnis' => ['setup' => 30, 'maintenance' => 70],
            'Dashboard / Sistem' => ['setup' => 20, 'maintenance' => 80],
            'Sistem Kompleks' => ['setup' => 15, 'maintenance' => 85],
        ];
        
        $split = $splits[$projectType] ?? $splits['Website Bisnis'];
        $setupCost = $totalValue * ($split['setup'] / 100);
        $maintenanceCost = $totalValue * ($split['maintenance'] / 100);
        $maintenanceMonthly = $maintenanceCost / 6;
        
        $investmentText = "Investasi proyek ini dirancang untuk memberikan nilai bisnis maksimal dengan dukungan berkelanjutan.\n\n";
        $investmentText .= "<strong>Rincian Investasi Proyek:</strong>\n\n";
        $investmentText .= "- <strong>Biaya Setup Awal</strong>: IDR " . number_format($setupCost, 0, ',', '.') . "\n";
        $investmentText .= "  Mencakup pengembangan sistem inti, integrasi data, dan deployment awal.\n\n";
        $investmentText .= "- <strong>Dukungan Stabilisasi (6 Bulan)</strong>: IDR " . number_format($maintenanceCost, 0, ',', '.') . "\n";
        $investmentText .= "  Maintenance bulanan: IDR " . number_format($maintenanceMonthly, 0, ',', '.') . "\n";
        $investmentText .= "  Mencakup monitoring, bug fixing, dan optimasi performa sistem.\n\n";
        $investmentText .= "<strong>Total Estimasi Investasi Proyek:</strong>\n";
        $investmentText .= "IDR " . number_format($totalValue, 0, ',', '.') . "\n\n";
        $investmentText .= "Investasi ini merupakan paket lengkap yang mencakup pengembangan awal dan fase stabilisasi sistem. Dukungan lanjutan setelah periode 6 bulan dapat dibahas secara terpisah sesuai kebutuhan operasional.";
        
        // Generate basic timeline based on deadline
        $deadline = $data['deadline'] ?? '30 Hari';
        $timelineText = $this->generateBasicTimeline($deadline);
        
        return [
            'title' => 'Proposal ' . ($data['client_name'] ?? 'Klien'),
            'executive_summary' => (string)$text,
            'problem_analysis' => '',
            'project_objectives' => '',
            'solutions' => '',
            'scope_of_work' => '',
            'system_walkthrough' => '',
            'timeline' => $timelineText,
            'investment' => $investmentText,
            'roi_impact' => '',
            'value_add' => '',
            'closing_cta' => '',
            'pricing' => isset($data['total_value']) ? number_format($data['total_value'], 0, ',', '.') : ''
        ];
    }
    
    protected function generateBasicTimeline($deadline)
    {
        // Parse deadline to extract number and unit
        preg_match('/(\d+)\s*(Hari|Minggu|Bulan)/i', $deadline, $matches);
        $totalDuration = isset($matches[1]) ? (int)$matches[1] : 30;
        $unit = isset($matches[2]) ? $matches[2] : 'Hari';
        
        // Divide into 3 phases proportionally
        $phase1 = round($totalDuration * 0.3);
        $phase2 = round($totalDuration * 0.4);
        $phase3 = $totalDuration - $phase1 - $phase2;
        
        $timeline = "<h3>Fase 1 – Inisiasi dan Discovery ($phase1 $unit)</h3>\n\n";
        $timeline .= "Memvalidasi kebutuhan bisnis dan menetapkan fondasi proyek yang solid.\n\n";
        $timeline .= "<strong>Aktivitas Utama:</strong>\n\n";
        $timeline .= "- Analisis kebutuhan dan riset mendalam\n";
        $timeline .= "- Persiapan infrastruktur dan arsitektur sistem\n\n";
        
        $timeline .= "<h3>Fase 2 – Pengembangan dan Integrasi ($phase2 $unit)</h3>\n\n";
        $timeline .= "Membangun sistem inti dan memastikan integrasi berjalan lancar.\n\n";
        $timeline .= "<strong>Aktivitas Utama:</strong>\n\n";
        $timeline .= "- Pengembangan fitur dan modul utama\n";
        $timeline .= "- Integrasi sistem dan testing awal\n\n";
        
        $timeline .= "<h3>Fase 3 – Testing dan Deployment ($phase3 $unit)</h3>\n\n";
        $timeline .= "Memastikan kualitas sistem dan kelancaran go-live.\n\n";
        $timeline .= "<strong>Aktivitas Utama:</strong>\n\n";
        $timeline .= "- Quality Assurance dan User Acceptance Testing\n";
        $timeline .= "- Deployment dan pelatihan tim\n\n";
        
        return $timeline;
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
   - Manusiawi, empatik, dan persuasif (bukan kaku seperti robot).
   - Hindari jargon teknis yang rumit. Gunakan bahasa bisnis yang mudah dipahami client awam.
   - Fokus pada: Solusi praktis, Kenyamanan operasional, dan Pertumbuhan bisnis.

🔹 STRUKTUR OUTPUT (JSON WAJIB):
{
  "cover": {
    "title": "PROPOSAL PENGEMBANGAN ...",
    "client_name": "' . $client . '",
    "year": "' . date('Y') . '"
  },
  "executive_summary": {
    "content": "Ringkasan eksekutif yang memikat. Gunakan alur: Masalah yang dihadapi klien -> Bagaimana kami membantu -> Hasil nyata yang akan dirasakan. Gunakan bahasa yang hangat namun tetap profesional. Hindari kata-kata sulit."
  },
  "background_problem": {
    "points": ["Kendala nyata (pain points) yang dirasakan operasional sehari-hari", "Hambatan bisnis yang menghambat pertumbuhan"]
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
      "phase": "Inisiasi dan Penemuan Metrik Kunci",
      "objective": "Tujuan fase ini untuk bisnis klien",
      "activities": ["Aktivitas 1", "Aktivitas 2"],
      "duration": "Durasi realistis (sesuaikan dengan total deadline ' . $deadline . ')"
    }
  ],
  "investment": {
    "total_value": "' . number_format($total, 0, ',', '.') . '",
    "narrative": "Penjelasan profesional tentang nilai investasi ini bagi bisnis klien. JANGAN sebutkan rumus matematika atau rincian teknis. Gunakan istilah: investasi, cakupan layanan, dukungan berkelanjutan, fase stabilisasi."
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
- Hindari kalimat pasif dan ambigu.

📅 KHUSUS TIMELINE (WAJIB DIPATUHI):
- **DEADLINE MUTLAK**: ' . $deadline . '
- Total durasi SEMUA fase HARUS PERSIS sama dengan deadline di atas.
- Jika deadline "14 Hari Kerja", maka total fase = 14 hari (contoh: Fase 1: 4 hari + Fase 2: 6 hari + Fase 3: 4 hari = 14 hari).
- Jika deadline "2 Bulan", maka total fase = 8 minggu (contoh: Fase 1: 3 minggu + Fase 2: 3 minggu + Fase 3: 2 minggu = 8 minggu).
- Jika deadline "30 Hari", maka total fase = 30 hari (contoh: Fase 1: 10 hari + Fase 2: 12 hari + Fase 3: 8 hari = 30 hari).
- Nama fase JANGAN menggunakan prefix "Fase 1:", "Fase 2:", dll (akan ditambahkan otomatis).
- Contoh BENAR: "phase": "Inisiasi dan Discovery"
- Contoh SALAH: "phase": "Fase 1: Inisiasi dan Discovery"
- Bagi timeline menjadi 3-4 fase yang realistis dan proporsional.
- PENTING: Durasi fase harus logis. Jika total deadline dalam "Minggu", gunakan satuan "Minggu" atau "Hari". Jika dalam "Bulan", gunakan "Bulan" atau "Minggu" agar tidak terjadi "0 Bulan".

💰 KHUSUS ESTIMASI INVESTASI:
- JANGAN menampilkan rumus matematika atau perhitungan teknis ke klien.
- JANGAN membuka rincian persentase Setup/Maintenance.
- JANGAN menggunakan kata "murah" atau "mahal".
- Gunakan istilah profesional: "investasi", "cakupan layanan", "dukungan berkelanjutan", "fase stabilisasi".
- Fokus pada nilai bisnis dan manfaat jangka panjang.
- Sistem akan otomatis menghitung breakdown berdasarkan tipe proyek (' . $type . ').';
    }
}
