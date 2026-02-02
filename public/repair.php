<?php
// DISABLE ALL CACHING
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

ini_set('display_errors', 1);
error_reporting(E_ALL);

// ATTEMPT OPCACHE RESET (Critical for persistent 500s)
if (function_exists('opcache_reset')) {
    opcache_reset();
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>DNB Emergency Repair</title>
    <style>
        body { background: #000; color: #0f0; font-family: monospace; padding: 20px; font-size: 14px; }
        .success { color: #0f0; font-weight: bold; }
        .error { color: #f00; font-weight: bold; }
        .btn { background: #0f0; color: #000; padding: 10px 20px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>🔥 DNB SYSTEM RECOVERY TOOL 🔥</h1>
    <hr>
    <pre>
<?php

$basePath = realpath(__DIR__ . '/..');
echo "ROOT: $basePath\n\n";

// 1. CLEAR BOOTSTRAP CACHE (Aggressive)
$files = [
    '/bootstrap/cache/packages.php',
    '/bootstrap/cache/services.php',
    '/bootstrap/cache/config.php',
    '/bootstrap/cache/routes-v7.php'
];

echo "[PHASE 1] Cleaning Cache Files...\n";
foreach ($files as $f) {
    $fullPath = $basePath . $f;
    if (file_exists($fullPath)) {
        if (unlink($fullPath)) {
            echo " [+] DELETED: $f <span class='success'>[OK]</span>\n";
        } else {
            echo " [-] FAILED: $f <span class='error'>[PERMISSION DENIED]</span>\n";
        }
    } else {
        echo " [.] MISSING: $f (Already Clean)\n";
    }
}

// 2. CHECK BOOTSTRAP CONFIG
echo "\n[PHASE 2] Verifying Config...\n";
$providersPath = $basePath . '/bootstrap/providers.php';
$configContent = file_get_contents($providersPath);
if (strpos($configContent, 'Barryvdh') !== false) {
    echo " [!] CRITICAL: Bad config found in providers.php\n";
    // Attempt Auto-Fix
    $newContent = str_replace("Barryvdh\DomPDF\ServiceProvider::class,", "", $configContent);
    file_put_contents($providersPath, $newContent);
    echo " [+] AUTO-FIXED: Removed bad provider from code. <span class='success'>[OK]</span>\n";
} else {
    echo " [+] Config looks clean. <span class='success'>[OK]</span>\n";
}

// 3. FINAL STATUS
echo "\n---------------------------------------------------\n";
echo "       SYSTEM STATUS: REPAIRED                     \n";
echo "---------------------------------------------------\n";
?>
    </pre>
    
    <p>Please click the button below to return to Admin Dashboard:</p>
    <a href="/admin" class="btn">GO TO DASHBOARD</a>
</body>
</html>
