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
                        'bab_1' => (string)$text, // Fallback if not valid JSON
                        'bab_2' => '',
                        'bab_3' => '',
                        'bab_4' => ''
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
            'bab_1' => "Gemini API Error (Confirmed models failed): " . $lastError,
            'bab_2' => '',
            'bab_3' => '',
            'bab_4' => ''
        ];
    }

    protected function buildPrompt($data)
    {
        $client = $data['client_name'] ?? 'Klien';
        $industry = $data['industry'] ?? 'Industri Umum';
        $website = $data['target_website'] ?? 'Tidak disebutkan';
        $problem = $data['problem_statement'] ?? 'Tidak disebutkan';

        return 'Anda adalah Senior Proposal Writer di DNB Agency (Dark and Bright), agensi pemasaran digital elit. 
        Tugas Anda adalah menulis proposal bisnis yang sangat persuasif, profesional, dan komprehensif dalam Bahasa Indonesia.
        
        Klien: ' . $client . '
        Industri: ' . $industry . '
        Website Target: ' . $website . '
        Masalah Utama: ' . $problem . '
        
        Persyaratan Proposal:
        1. Anda WAJIB mengembalikan hasil dalam format JSON murni tanpa teks lainnya.
        2. Format JSON harus memiliki key: "title", "bab_1", "bab_2", "bab_3", "bab_4".
        3. Setiap Bab harus berisi teks yang sangat mendalam dan persuasif (minimal 400-500 kata per bab).
        4. Gunakan nada bicara yang berwibawa, solutif, dan "mahal".
        5. Struktur Konten:
           - title: Judul Proposal yang menarik (contoh: "Transformasi Digital Visioner untuk [Nama Klien]").
           - bab_1: Eksekutif Summary & Analisis Audit (Audit website/bisnis mereka secara spesifik).
           - bab_2: Strategi Dark & Bright (Solusi digital marketing yang transformatif dan teknis).
           - bab_3: Timeline, Metode Kerja, & Kenapa DNB Agency? (Social proof dan otoritas).
           - bab_4: Kesimpulan & Call to Action yang kuat.
        
        Jangan sertakan kata-kata pembuka atau penutup di luar JSON. Kembalikan hanya objek JSON tersebut.';
    }
}
