<?php
$redis = new Redis();
$redis->connect("localhost", 6379);
$servername = "localhost";
$username = "admin";
$dbpassword = "";
$db = "logininfo";
$connection = mysqli_connect($servername, $username, $dbpassword, $db);
if ($connection) {
    $query = "CREATE DATABASE IF NOT EXISTS logininfo";
    mysqli_query($connection, $query);
    mysqli_query($connection, "use logininfo");
    $query = "CREATE TABLE IF NOT EXISTS credentials(
    mailid varchar(30) primary key,
    password varchar(20));";
    if (!mysqli_query($connection, $query)) {
        echo mysqli_connect_error();
    }
} else {
    die("Connection failed: " . mysqli_connect_error());
}
// $prepstats = $connection->prepare("INSERT INTO credentials VALUES(?,?);");
$mailid = strtolower($_POST["email"]);
$password = $_POST["password"];
// $prepstats->bind_param("ss",$mailid,$password);
$res = mysqli_query($connection, "SELECT * FROM credentials WHERE mailid = '$mailid' AND password='$password';");
$num_rows = mysqli_num_rows($res);
if ($num_rows === 0) {
    die("Check your mailid and password...");
} else {
    echo "profile.html";
}
if ($redis) {
    $redis->set("mailid", $mailid);
}
// header('Access-Control-Allow-Origin: register.html');
// echo "Login Successfull";
// $prepstats->execute();
// $prepstats->close();
$connection->close();
?>