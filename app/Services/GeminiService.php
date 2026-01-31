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
                        'closing_cta' => ''
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
            'closing_cta' => ''
        ];
    }

    protected function buildPrompt($data)
    {
        $client = $data['client_name'] ?? 'Klien';
        $industry = $data['industry'] ?? 'Industri Umum';
        $website = $data['target_website'] ?? 'Tidak disebutkan';
        $problem = $data['problem_statement'] ?? 'Tidak disebutkan';

        return 'Anda adalah sistem AI Proposal Generator milik agency "Dark and Bright".
        Tugas Anda adalah menghasilkan ISI PROPOSAL PROFESIONAL yang fokus pada kebutuhan klien, menggunakan bahasa bisnis yang jelas, mudah dipahami, dan tidak terlalu teknis.

        Klien: ' . $client . '
        Industri: ' . $industry . '
        Website Target: ' . $website . '
        Masalah Utama: ' . $problem . '

        Persyaratan Proposal:
        1. Anda WAJIB mengembalikan hasil dalam format JSON murni tanpa teks lainnya.
        2. Format JSON harus memiliki key berikut:
           "title", "executive_summary", "problem_analysis", "project_objectives", "solutions", "scope_of_work", "system_walkthrough", "timeline", "roi_impact", "value_add", "closing_cta"
        3. Gunakan Bahasa Indonesia formal-profesional.
        4. Struktur Konten WAJIB mengikuti urutan ini:
           - title: Judul Proposal yang menarik dan profesional.
           - executive_summary: Ringkasan eksekutif (masalah, solusi inti, dampak bisnis).
           - problem_analysis: Latar belakang & masalah klien (fokus pada inefisiensi, sistem, data).
           - project_objectives: Tujuan proyek (poin-poin terukur).
           - solutions: Solusi yang ditawarkan (dalam bentuk modul, jelaskan apa yang dikerjakan & manfaatnya).
           - scope_of_work: Ruang lingkup pekerjaan (daftar pekerjaan konkret/deliverables).
           - system_walkthrough: Alur sistem & cara kerja (narasi sederhana & logis).
           - timeline: Timeline implementasi (fase perencanaan, pengembangan, pengujian, peluncuran).
           - roi_impact: Estimasi dampak & ROI (ilustrasi potensi efisiensi/peningkatan).
           - value_add: Nilai tambah Dark and Bright (mengapa kami partner yang tepat).
           - closing_cta: Penutup & ajakan kerja sama profesional.

        Kembalikan hanya objek JSON tersebut tanpa markdown code blocks.';
    }
}
