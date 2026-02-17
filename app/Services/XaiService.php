<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class XaiService
{
    protected $apiKey;
    protected $baseUrl = 'https://api.x.ai/v1/chat/completions';
    protected $model;

    public function __construct()
    {
        $this->apiKey = config('services.xai.key');
        $this->model = config('services.xai.model', 'grok-2-latest');
    }

    public function generateProposal($data)
    {
        if (!$this->apiKey) {
            return "Error: xAI API Key is not configured in .env (XAI_API_KEY).";
        }

        $prompt = $this->buildPrompt($data);

        try {
            $response = Http::withToken($this->apiKey)
                ->post($this->baseUrl, [
                    'model' => $this->model,
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => 'You are a professional proposal writer for a digital agency. You focus on business value and ROI. You respond ONLY in valid JSON format as specified.'
                        ],
                        [
                            'role' => 'user',
                            'content' => $prompt
                        ]
                    ],
                    'temperature' => 0.7,
                    'response_format' => ['type' => 'json_object'],
                ]);

            if ($response->successful()) {
                $result = $response->json();
                $text = $result['choices'][0]['message']['content'] ?? '';
                
                Log::info("xAI API Raw Response Content:", ['content' => substr($text, 0, 500)]);

                $decoded = json_decode($text, true);
                
                if (is_array($decoded)) {
                    $mapped = $this->mapOutputToFrontend($decoded, $data);
                    Log::info("xAI Mapped Keys:", ['keys' => array_keys($mapped)]);
                    return $mapped;
                }

                Log::warning("xAI API returned non-JSON content", ['text' => substr($text, 0, 200)]);
                return $this->getEmptyProposal($data, $text);
            }

            $error = $response->json()['error']['message'] ?? 'Unknown error';
            Log::error("xAI API failed: " . $error);
            return $this->getErrorProposal($error);

        } catch (\Exception $e) {
            Log::error("XaiService Exception: " . $e->getMessage());
            return $this->getErrorProposal($e->getMessage());
        }
    }

    // --- Output Mapping Logic (Mirroring GeminiService for Frontend Compatibility) ---

    protected function mapOutputToFrontend($decoded, $data)
    {
        $toList = function($arr) {
            if (!is_array($arr)) {
                $text = (string)$arr;
                $text = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $text);
                
                if (str_contains($text, "\n")) {
                    $lines = explode("\n", $text);
                    $out = "<ul>";
                    foreach ($lines as $line) {
                        $line = trim($line);
                        if (empty($line)) continue;
                        $cleanedItem = preg_replace('/^[\-\*\•\→\⇒\>\d\.]+\s*/', '', $line);
                        $out .= "<li>" . trim($cleanedItem) . "</li>";
                    }
                    return $out . "</ul>";
                }

                $paragraphs = explode("\n\n", $text);
                return implode("", array_map(fn($p) => "<p>" . trim($p) . "</p>", array_filter($paragraphs)));
            }
            
            $out = "<ul>";
            foreach ($arr as $item) {
                $item = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $item);
                $out .= "<li>" . $item . "</li>";
            }
            $out .= "</ul>";
            return $out;
        };

        $toSolutions = function($solutions) {
            if (is_array($solutions)) {
                if (isset($solutions['content'])) {
                    $text = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $solutions['content']);
                    return "<div style='padding:12mm; background:#f8fafc; border-radius:10mm; border:1pt solid #e2e8f0; color:#0f172a; font-size:10.5pt; line-height:1.7; text-align:justify;'>$text</div>";
                }
                $modules = isset($solutions[0]) ? $solutions : [];
            } else {
                return "<div style='padding:12mm; background:#f8fafc; border-radius:10mm; border:1pt solid #e2e8f0; text-align:justify;'>" . preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', (string)$solutions) . "</div>";
            }

            if (empty($modules)) return "<p>Solusi akan disesuaikan dengan kebutuhan bisnis klien.</p>";

            $out = "<div style='display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6mm; margin-top: 5mm;'>";
            $limited = array_slice($modules, 0, 3);
            foreach ($limited as $idx => $s) {
                $num = $idx + 1;
                $out .= "<div style='padding: 6mm; background: #fff; border: 1pt solid #cbd5e1; border-radius: 8mm; position: relative;'>";
                $out .= "<div style='position: absolute; top: 0; right: 4mm; color: #3b82f6; opacity: 0.1; font-size: 28pt; font-weight: 900;'>0$num</div>";
                $out .= "<h3 style='font-size: 10pt; font-weight: 900; color: #0f172a; border-bottom: 2pt solid #3b82f6; display: inline-block; margin-bottom: 3mm; padding-bottom: 1mm;'>" . ($s['module_name'] ?? 'Pilar Solusi') . "</h3>";
                $out .= "<p style='font-size: 9pt; color: #475569; line-height: 1.5; margin-bottom: 2mm;'><strong>Problem:</strong> " . ($s['problem_solved'] ?? '-') . "</p>";
                $out .= "<p style='font-size: 9pt; color: #0f172a; line-height: 1.5;'><strong>Impact:</strong> " . ($s['business_benefit'] ?? '-') . "</p>";
                $out .= "</div>";
            }
            $out .= "</div>";
            return $out;
        };

        $toTimeline = function($timeline) {
            if (!is_array($timeline)) return (string)$timeline;
            $out = "";
            foreach ($timeline as $idx => $t) {
                $faseNum = $idx + 1;
                $phaseName = $t['phase'] ?? 'Tahap Pengembangan';
                $phaseName = preg_replace('/^Fase\s*\d+:\s*/i', '', $phaseName);
                
                $out .= "<div style='margin-bottom: 6mm;'>";
                $out .= "<h3 style='font-size: 12pt; font-weight: 900; color: #0f172a; margin-bottom: 1mm;'>Fase $faseNum: $phaseName (" . ($t['duration'] ?? '-') . ")</h3>";
                
                $desc = $t['objective'] ?? '';
                if (isset($t['activities']) && is_array($t['activities'])) {
                    $acts = implode(". ", array_map('trim', $t['activities']));
                    $desc .= ($desc ? " " : "") . "<strong>Aktivitas Utama:</strong> " . $acts . ".";
                }
                
                $out .= "<p style='font-size: 10pt; line-height: 1.6; color: #475569; text-align: justify; margin: 0;'>$desc</p>";
                $out .= "</div>";
            }
            return $out;
        };

        $toInvestment = function($inv, $projectType, $totalValue) {
            if (!is_array($inv)) return (string)$inv;
            
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
            'closing_cta' => (isset($decoded['closing']['call_to_action']) && is_string($decoded['closing']['call_to_action'])) ? ("<p>" . $decoded['closing']['call_to_action'] . "</p>") : '',
            'pricing' => $decoded['investment']['total_value'] ?? ($data['total_value'] ? number_format($data['total_value'], 0, ',', '.') : '0'),
            'raw_json' => $decoded 
        ];
    }

    protected function getEmptyProposal($data, $text)
    {
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
        $investmentText .= "Investasi ini merupakan paket lengkap yang mencakup pengembangan awal dan fase stabilisasi sistem.";
        
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
        preg_match('/(\d+)\s*(Hari|Minggu|Bulan)/i', $deadline, $matches);
        $totalDuration = isset($matches[1]) ? (int)$matches[1] : 30;
        $unit = isset($matches[2]) ? $matches[2] : 'Hari';
        
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
            'executive_summary' => "xAI API Error: " . $lastError,
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

        return 'Anda adalah Digital Solution Partner dari Dark and Bright. 
Tugas Anda adalah menyusun proposal profesional yang elegan.
Berikan output dalam format JSON objek dengan struktur berikut:

{
  "cover": { "title": "PROPOSAL PENGEMBANGAN ...", "client_name": "' . $client . '", "year": "' . date('Y') . '" },
  "executive_summary": { "content": "..." },
  "background_problem": { "points": ["...", "..."] },
  "project_goals": { "goals": ["...", "...", "..."] },
  "solutions": [ { "module_name": "...", "problem_solved": "...", "business_benefit": "..." } ],
  "scope_of_work": { "deliverables": ["...", "..."] },
  "system_flow": { "description": "..." },
  "timeline": [ { "phase": "...", "objective": "...", "activities": ["..."], "duration": "..." } ],
  "investment": { "total_value": "' . number_format($total, 0, ',', '.') . '", "narrative": "..." },
  "impact_roi": { "impact_points": ["...", "..."] },
  "value_proposition": { "points": ["...", "..."] },
  "closing": { "call_to_action": "..." }
}

Klien: ' . $client . '
Masalah: ' . $problem . '
Tipe: ' . $type . '
Deadline: ' . $deadline . '
Investasi: IDR ' . number_format($total, 0, ',', '.') . '

PENTING: Gunakan bahasa Indonesia profesional. Fokus pada ROI dan nilai bisnis. Total durasi timeline harus ' . $deadline . '.';
    }
}
