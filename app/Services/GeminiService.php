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
                        // Ensure all elements are strings to prevent React crash (Error #31)
                        return array_map(function($val) {
                            return is_array($val) ? json_encode($val) : (string)$val;
                        }, $decoded);
                    }

                    return [
                        'title' => 'Proposal ' . ($data['client_name'] ?? 'Klien'),
                        'executive_summary' => (string)$text,
                        'problem_analysis' => '',
                        'project_objectives' => '',
                        'solutions' => '',
                        'scope_of_work' => '',
                        'system_walkthrough' => '',
                        'timeline' => '',
                        'roi_impact' => '',
                        'value_add' => '',
                        'closing_cta' => '',
                        'pricing' => isset($data['total_value']) ? number_format($data['total_value'], 0, ',', '.') : ''
                    ];
                }

                $lastError = $response->json()['error']['message'] ?? 'Unknown error';
                Log::warning("Gemini model $model failed: $lastError. Trying next...");

            } catch (\Exception $e) {
                $lastError = $e->getMessage();
                Log::error("Gemini Service Exception with $model: " . $lastError);
            }
        }

        return [
            'title' => 'Error Generation',
            'executive_summary' => "Gemini API Error (Confirmed models failed): " . $lastError,
            'problem_analysis' => '',
            'project_objectives' => '',
            'solutions' => '',
            'scope_of_work' => '',
            'system_walkthrough' => '',
            'timeline' => '',
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
        $website = $data['target_website'] ?? 'Tidak disebutkan';
        $problem = $data['problem_statement'] ?? 'Tidak disebutkan';
        $type = $data['project_type'] ?? 'Website Bisnis';
        $total = $data['total_value'] ?? 0;
        $duration = $data['contract_duration'] ?? 6;
        $deadline = $data['deadline'] ?? '14 Hari';

        return 'Anda adalah sistem AI Proposal Generator milik agency "Dark and Bright".
        Tugas Anda adalah menghasilkan ISI PROPOSAL PROFESIONAL yang fokus pada kebutuhan klien, menggunakan bahasa bisnis yang jelas, mudah dipahami, dan tidak terlalu teknis.

        Klien: ' . $client . '
        Industri: ' . $industry . '
        Website Target: ' . $website . '
        Masalah Utama: ' . $problem . '
        Tipe Proyek: ' . $type . '
        Nilai Total Proyek: IDR ' . number_format($total, 0, ',', '.') . '
        Durasi Kontrak: ' . $duration . ' Bulan
        Waktu Pengerjaan: ' . $deadline . '

        PRINSIP DASAR PERHITUNGAN BIAYA (Dark and Bright):
        - Total nilai proyek dianggap sebagai 100% nilai kontrak.
        - Persentase Setup & Maintenance berdasarkan Tipe Proyek:
          * Landing Page: Setup 40%, Maintenance 60%
          * Website Bisnis: Setup 30%, Maintenance 70%
          * Dashboard / Sistem: Setup 20%, Maintenance 80%
          * Sistem Kompleks: Setup 15%, Maintenance 85%
        - Nilai Setup = Persentase Setup × Nilai Total
        - Nilai Maintenance Total = Persentase Maintenance × Nilai Total
        - Maintenance Bulanan = Nilai Maintenance Total ÷ ' . $duration . ' bulan

        ATURAN OUTPUT KHUSUS UNTUK KEY "timeline" (BAB 7):
        Setelah menjelaskan fase timeline pengerjaan, tambahkan bagian "Estimasi Investasi & Pembiayaan" dengan rincian:
        1. Model Kerjasama: Sebutkan pembagian Setup & Maintenance.
        2. Setup Awal: IDR ' . number_format($total * ($type == 'Landing Page' ? 0.4 : ($type == 'Website Bisnis' ? 0.3 : ($type == 'Dashboard / Sistem' ? 0.2 : 0.15))), 0, ',', '.') . ' (Sekali bayar).
        3. Maintenance Bulanan: IDR ' . number_format(($total * ($type == 'Landing Page' ? 0.6 : ($type == 'Website Bisnis' ? 0.7 : ($type == 'Dashboard / Sistem' ? 0.8 : 0.85)))) / $duration, 0, ',', '.') . ' per bulan (selama ' . $duration . ' bulan).
        4. Total Kontrak: IDR ' . number_format($total, 0, ',', '.') . '.
        
        Persyaratan Proposal:
        1. Anda WAJIB mengembalikan hasil dalam format JSON murni tanpa teks lainnya.
        2. Format JSON harus memiliki key berikut:
           "title", "executive_summary", "problem_analysis", "project_objectives", "solutions", "scope_of_work", "system_walkthrough", "timeline", "roi_impact", "value_add", "closing_cta", "pricing"
        3. Gunakan Bahasa Indonesia formal-profesional.
        4. Jangan menggunakan istilah teknis berlebihan.
        5. Jangan menjanjikan hasil finansial pasti.
        6. Key "pricing" hanya diisi dengan nominal total nilai proyek dalam format string (Contoh: "10.000.000").
        
        Kembalikan hanya objek JSON tersebut tanpa markdown code blocks.';
    }
}
