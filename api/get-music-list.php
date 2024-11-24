<?php
// Hata raporlamayı aç
ini_set('display_errors', 1);
error_reporting(E_ALL);

// JSON içerik tipi
header('Content-Type: application/json');

// Müzik dosyalarının bulunduğu klasör
$musicFolder =  'C:\xampp\htdocs\MusicApp\music';

// Klasörün varlığını kontrol et
if (!is_dir($musicFolder)) {
    echo json_encode(['error' => 'Müzik klasörü bulunamadı.']);
    exit;
}

// Klasördeki MP3 dosyalarını filtrele
$files = array_filter(scandir($musicFolder), function($file) use ($musicFolder) {
    $filePath = $musicFolder . DIRECTORY_SEPARATOR . $file;
    return is_file($filePath) && pathinfo($file, PATHINFO_EXTENSION) === 'mp3';
});

// Eğer dosya yoksa hata döndür
if (empty($files)) {
    echo json_encode(['error' => 'Klasörde MP3 dosyası bulunamadı.']);
    exit;
}

// JSON formatında dosya listesini döndür
echo json_encode(['files' => array_values($files)]);
?>
