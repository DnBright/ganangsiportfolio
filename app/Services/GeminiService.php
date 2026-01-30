<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected $apiKey;
    protected $endpoint = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

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

        try {
            $response = Http::post($this->endpoint . '?key=' . $this->apiKey, [
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
                return $result['candidates'][0]['content']['parts'][0]['text'] ?? 'AI gagal menghasilkan konten.';
            }

            Log::error('Gemini API Error: ' . $response->body());
            return "Gemini API Error: " . ($response->json()['error']['message'] ?? 'Unknown error');

        } catch (\Exception $e) {
            Log::error('Gemini Service Exception: ' . $e->getMessage());
            return "Exception: " . $e->getMessage();
        }
    }

    protected function buildPrompt($data)
    {
        $client = $data['client_name'] ?? 'Klien';
        $industry = $data['industry'] ?? 'Industri Umum';
        $website = $data['target_website'] ?? 'Tidak disebutkan';
        $problem = $data['problem_statement'] ?? 'Tidak disebutkan';

        return "Anda adalah Senior Proposal Writer di DNB Agency (Dark and Bright), agensi pemasaran digital elit. 
        Tugas Anda adalah menulis proposal bisnis yang sangat persuasif, profesional, dan komprehensif dalam Bahasa Indonesia.
        
        Klien: $client
        Industri: $industry
        Website Target: $website
        Masalah Utama: $problem
        
        Persyaratan Proposal:
        1. Panjang proposal harus sekitar 5-6 halaman jika dicetak (sekitar 1500-2000 kata).
        2. Gunakan nada bicara yang berwibawa, solutif, dan 'mahal'.
        3. Struktur proposal harus mencakup bab-bab berikut:
           - Bab 1: Eksekutif Summary & Visi (Buat pembukaan yang memukau).
           - Bab 2: Analisis Audit Mendalam (Bedah website target/bisnis mereka).
           - Bab 3: Strategi Dark & Bright (Solusi digital marketing yang transformatif).
           - Bab 4: Timeline & Metode Kerja.
           - Bab 5: Kenapa DNB Agency? (Social proof dan otoritas).
           - Bab 6: Kesimpulan & Call to Action.
        
        Tuliskan isi proposal secara lengkap dan mendalam (bukan hanya poin-poin). Tambahkan detail teknis digital marketing (SEO, Ads, UI/UX, dll) yang relevan dengan industri mereka.";
    }
}
