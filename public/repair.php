<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$basePath = realpath(__DIR__ . '/..');

?>
<!DOCTYPE html>
<html>
<head>
    <title>DNB Diagnostic</title>
    <style>
        body { background: #111; color: #ddd; font-family: monospace; padding: 20px; }
        .success { color: #0f0; }
        .error { color: #f00; font-weight: bold; font-size: 1.2em; }
        .warning { color: #fe0; }
        textarea { width: 100%; height: 400px; background: #222; color: #ee0; border: 1px solid #444; padding: 10px; font-family: monospace; }
        .btn { background: #0f0; color: #000; padding: 10px; text-decoration: none; display: inline-block; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>🕵️ DNB DEEP DIAGNOSTIC 🕵️</h1>
    <p>Server Time: <?php echo date('Y-m-d H:i:s'); ?></p>
    
    <h3>1. INTEGRITY CHECK</h3>
    <pre>
<?php
// Check Vendor
$autoload = $basePath . '/vendor/autoload.php';
if (file_exists($autoload)) {
    echo " [+] vendor/autoload.php FOUND <span class='success'>[OK]</span>\n";
    // Try to include it to see if it crashes
    try {
        require_once $autoload;
        echo " [+] Vendor Autoload Loaded Successfully <span class='success'>[OK]</span>\n";
    } catch (Throwable $e) {
        echo " [-] Vendor Autoload CRASHED: " . $e->getMessage() . " <span class='error'>[FAIL]</span>\n";
    }
} else {
    echo " [-] vendor/autoload.php MISSING <span class='error'>[CRITICAL FAIL]</span>\n";
    echo "     ACTION REQUIRED: Run 'composer install --no-dev' in terminal inside $basePath\n";
}

// Check Bootstrap Providers
$providers = $basePath . '/bootstrap/providers.php';
if (file_exists($providers)) {
    $content = file_get_contents($providers);
    if (strpos($content, 'Barryvdh') !== false) {
        echo " [-] bootstrap/providers.php still contains 'Barryvdh' <span class='error'>[FAIL]</span>\n";
    } else {
        echo " [+] bootstrap/providers.php is clean <span class='success'>[OK]</span>\n";
    }
}
?>
    </pre>

    <h3>2. SERVER LOGS (Last 100 Lines)</h3>
    <?php
    $logFile = $basePath . '/storage/logs/laravel.log';
    if (file_exists($logFile)) {
        if (!is_writable($logFile)) {
             echo "<p class='error'>WARNING: Log file exists but is NOT writable. Permission issue?</p>";
        }
        $lines = file($logFile);
        $last = array_slice($lines, -100);
        echo "<textarea readonly>";
        foreach($last as $line) {
            echo htmlspecialchars($line);
        }
        echo "</textarea>";
    } else {
        echo "<div class='error'>Log file not found at: $logFile</div>";
    }
    ?>
    
    <h3>3. ENV CHECK</h3>
    <pre>
<?php
echo "PHP Version: " . phpversion() . "\n";
echo "Base Path: $basePath\n";
?>
    </pre>
</body>
</html>
