<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

// Gelen JSON isteği al
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['videoId'])) {
    echo json_encode(['error' => 'Geçersiz video ID.']);
    exit;
}

$videoId = $data['videoId'];
$savePath = __DIR__ . '/../music/';

if (!is_dir($savePath)) {
    mkdir($savePath, 0777, true);
}

$command = escapeshellcmd("yt-dlp -x --audio-format mp3 --output '{$savePath}%(title)s.%(ext)s' https://www.youtube.com/watch?v={$videoId}");
exec($command, $output, $result);

if ($result === 0) {
    echo json_encode(['message' => 'MP3 başarıyla indirildi.']);
} else {
    echo json_encode(['error' => 'Dosya indirilemedi.']);
}
