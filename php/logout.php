<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $key = "mailid";
    $redis = new Redis();
    $redis->connect("localhost", 6379);
    $redis->del($key);
}
?>