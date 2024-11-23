<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Müzik dosyalarının bulunduğu klasör
$musicFolder = 'C:\xampp\htdocs\MusicApp\music'; 

// Klasörün var olup olmadığını kontrol et
if (!is_dir($musicFolder)) {
    echo json_encode(['error' => 'Müzik klasörü bulunamadı.']);
    exit;
}

// Klasördeki dosyaları oku
$files = scandir($musicFolder);

// Eğer dizinde dosya yoksa, bir hata mesajı döndür
if ($files === false) {
    echo json_encode(['error' => 'Dosyalar okunamadı.']);
    exit;
}

// MP3 dosyalarını filtrele
$mp3Files = array_filter($files, function($file) {
    return pathinfo($file, PATHINFO_EXTENSION) === 'mp3';
});

// MP3 dosyalarını döndür
echo json_encode(array_values($mp3Files)); // array_values() diziyi sıfırdan indeksler
?>