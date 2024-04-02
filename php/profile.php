<?php
$redis = new Redis();
$redis->connect("localhost", 6379);
if ($redis->exists('mailid')) {
    $mail = $redis->get('mailid');
    // echo $mail;
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $filter = ['_id' => "$mail"];
        $option = [];
        $connection = new MongoDB\Driver\Manager("mongodb://localhost:27017");
        $query = new MongoDB\Driver\Query($filter, $option);
        $res = $connection->executeQuery("profile.details", $query);
        foreach ($res as $row) {
            echo (json_encode($row));
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'];
        $age = $_POST['age'];
        $secPhNumber = $_POST['secPhNumber'];
        try {
            $db = "profile.details";
            $connection = new MongoDB\Driver\Manager("mongodb://localhost:27017");
            if ($connection) {
                $bulk = new MongoDB\Driver\BulkWrite;
                $bulk->update(['_id' => $mail], ['$set' => ['name' => $username, 'age' => $age, 'secPhNumber' => $secPhNumber]]);
                $connection->executeBulkWrite($db, $bulk);
            }
        } catch (Exception $e) {
            die("Error occurred : $e");
        }
    }
    // function shutdown()
    // {
    //     $redis->delete($redis->keys("*"));
    // }
    // register_shutdown_function('shutdown', get_included_files());
} else {
    echo "ERROR : Authorized Access (401)";
}
?>