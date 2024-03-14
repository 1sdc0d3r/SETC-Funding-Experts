<?php
if(isset($_POST['submit'])) {
  // $email_to = "braden@bluesmokemedia.net"; //email address for receiving email
  //! Required Vars
  $subject = $_POST['subject'];
  $message = $_POST['message'];
  $emailProofing = $_POST['test-email'];
  $proofEmail = "2355braden@gmail.com";
  $emailReqUrl = "https://setc-funding-experts.bluesmokemedia.net/api";
  //! Required Vars

  function died($error) {
    // your error code can go here
    echo "We're sorry, but there's errors found with the form you submitted.<br /><br />";
    echo $error."<br /><br />";
    echo "Please go back and try again.<br /><br />";
    die();
  }

  // validation expected data exists
  if(!isset($subject) || !isset($message)) {
    died('We are sorry, but there appears to be a problem with the form you submitted. Please check all required fields.');
  };


  if($emailProofing=='true'){
    $emailArr = [$proofEmail];
  } else {
    $xml = file_get_contents($emailReqUrl);
    $emailArr = json_decode($xml);
  };

  for ($i=0; $i < count($emailArr); $i++) {
    $email_to = $emailArr[$i];
    mail($email_to, $subject, $message, "From: test@bluesmokemedia.net" . "\r\n" . "Content-Type: text/html; charset=utf-8",
          "-ftest@bluesmokemedia.net");
    sleep(.035); //prevent overloading
  }
?>


<!-- place your own success html below -->
<html>
<head></head>
<body>
<script type="text/javascript">
// alert("We have received your quote form, we will get back to you shortly. Thank You.");
// todo redirect anywhere?
// window.location.href='/';
</script>
    <h1>Email sent!</h1>
</body>
</html>

<?php
}
die();
?>

//todo validate phone number and email -->
