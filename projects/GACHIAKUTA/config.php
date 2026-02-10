<?php
    $host = 'localhost';
    $db   = '101716_personal';
    $user = '101716_personal';
    $pass = 'Egeltje13';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

try {

   $pdo = new PDO("mysql:host:dbname=101716_personal;", "101716_personal", "Egeltje13");

    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass, $options);

    // set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


//     echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>