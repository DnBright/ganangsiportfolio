<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<html><body style='font-family: monospace; background: #1e1e1e; color: #0f0; padding: 20px;'>";
echo "<h1>DNB Utilities: Emergency Repair</h1>";
echo "<pre>";

// 1. Verify Project Root
$basePath = realpath(__DIR__ . '/..');
echo "[INFO] Project Root: " . $basePath . "\n";

// 2. Check & Clear Bootstrap Cache (The #1 Cause of 500 Errors)
echo "\n[ACTION] Checking bootstrap/cache...\n";
$cachePath = $basePath . '/bootstrap/cache';
$files = glob($cachePath . '/*.php');

if (empty($files)) {
    echo " - No cache files found (Good).\n";
} else {
    foreach ($files as $file) {
        $filename = basename($file);
        echo " - Found cache file: $filename... ";
        
        if (unlink($file)) {
            echo "<span style='color:cyan'>DELETED</span>\n";
        } else {
            echo "<span style='color:red'>FAILED TO DELETE (Check Permissions)</span>\n";
        }
    }
}

// 3. Verify bootstrap/providers.php (Did the revert work?)
echo "\n[CHECK] Verifying bootstrap/providers.php content...\n";
$providersFile = $basePath . '/bootstrap/providers.php';
if (file_exists($providersFile)) {
    $content = file_get_contents($providersFile);
    echo " - File exists.\n";
    if (strpos($content, 'Barryvdh') !== false) {
        echo "<span style='color:red'>[CRITICAL] 'Barryvdh' provider STILL FOUND in providers.php! Git pull failed?</span>\n";
    } else {
        echo "<span style='color:cyan'>[OK] Provider list looks clean.</span>\n";
    }
} else {
    echo " - bootstrap/providers.php MISSING.\n";
}

// 4. Verify DomPDF Folder (Is it actually installed?)
echo "\n[CHECK] Verifying DomPDF installation...\n";
$dompdfPath = $basePath . '/vendor/barryvdh/laravel-dompdf';
if (is_dir($dompdfPath)) {
    echo "<span style='color:cyan'>[OK] Vendor folder found: $dompdfPath</span>\n";
} else {
    echo "<span style='color:yellow'>[WARNING] Vendor folder MISSING. PDF Export will assume missing.</span>\n";
}

echo "\n[DONE] Repair script completed.\n";
echo "If you see 'DELETED' above or 'Provider list looks clean', please try accessing the main dashboard again.";
echo "</pre></body></html>";
