<?php
// admin-messages.php - Handle message storage and retrieval
header('Content-Type: application/json');

$messagesFile = 'messages.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Read messages from file
    if (file_exists($messagesFile)) {
        $messages = json_decode(file_get_contents($messagesFile), true) ?: [];
    } else {
        $messages = [];
    }
    
    echo json_encode(['success' => true, 'messages' => $messages]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    if ($action === 'mark_read') {
        $messageId = $_POST['id'] ?? '';
        $messages = json_decode(file_get_contents($messagesFile), true) ?: [];
        
        foreach ($messages as &$message) {
            if ($message['id'] === $messageId) {
                $message['read'] = true;
                break;
            }
        }
        
        file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT));
        echo json_encode(['success' => true]);
        exit;
    }
    
    if ($action === 'archive') {
        $messageId = $_POST['id'] ?? '';
        $messages = json_decode(file_get_contents($messagesFile), true) ?: [];
        $messages = array_filter($messages, fn($msg) => $msg['id'] !== $messageId);
        
        file_put_contents($messagesFile, json_encode(array_values($messages), JSON_PRETTY_PRINT));
        echo json_encode(['success' => true]);
        exit;
    }
}
?>