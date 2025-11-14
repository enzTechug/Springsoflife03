<?php
// admin-reply.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recipient = $_POST['recipient_email'];
    $subject = $_POST['subject'];
    $message = $_POST['reply_message'];
    
    $headers = "From: info@zomboeldercare.org\r\n";
    $headers .= "Reply-To: info@zomboeldercare.org\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    if (mail($recipient, $subject, $message, $headers)) {
        echo "<script>alert('Reply sent successfully!'); window.location.href = 'admin.html';</script>";
    } else {
        echo "<script>alert('Error sending reply. Please try again.'); window.location.href = 'admin.html';</script>";
    }
}
?>