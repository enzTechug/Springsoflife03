<?php
// contact.php - Enhanced with better validation and error handling
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo "<script>alert('Please fill in all required fields.'); window.history.back();</script>";
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Please enter a valid email address.'); window.history.back();</script>";
        exit;
    }
    
    // Store message in JSON file
    $messageData = [
        'id' => uniqid(),
        'name' => $name,
        'email' => $email,
        'message' => $message,
        'date' => date('Y-m-d H:i:s'),
        'read' => false
    ];
    
    $messagesFile = 'messages.json';
    $messages = [];
    
    if (file_exists($messagesFile)) {
        $messagesData = file_get_contents($messagesFile);
        $messages = json_decode($messagesData, true) ?: [];
    }
    
    array_unshift($messages, $messageData);
    
    if (!file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT))) {
        error_log("Failed to write to messages.json");
    }
    
    // Email configuration
    $to = "info@zomboeldercare.org"; // Change to your actual email
    $subject = "New Contact Form Submission - Zombo Elder Care";
    
    // Enhanced email headers
    $headers = "From: Zombo Elder Care <noreply@zomboeldercare.org>\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2F5D62; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; background: #f9f9f9; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #2F5D62; }
            .footer { background: #DFEEEA; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='field-label'>Name:</span> " . htmlspecialchars($name) . "
                </div>
                <div class='field'>
                    <span class='field-label'>Email:</span> " . htmlspecialchars($email) . "
                </div>
                <div class='field'>
                    <span class='field-label'>Message:</span><br>
                    <div style='margin-top: 10px; padding: 10px; background: white; border-left: 4px solid #5E8B7E;'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>This email was sent from the Zombo Elder Care website contact form on " . date('F j, Y \a\t g:i A') . "</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Send email
    if (mail($to, $subject, $email_body, $headers)) {
        echo "<script>
            alert('Thank you for your message! We will get back to you soon.');
            window.location.href = 'contact.html';
        </script>";
    } else {
        // Log error but still show success to user (message is stored in JSON)
        error_log("Failed to send email for contact form submission from: " . $email);
        echo "<script>
            alert('Thank you for your message! It has been received. We will get back to you soon.');
            window.location.href = 'contact.html';
        </script>";
    }
} else {
    header("Location: contact.html");
    exit;
}
?>