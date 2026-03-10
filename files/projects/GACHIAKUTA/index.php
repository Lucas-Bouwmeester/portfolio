<?php
 require 'config.php';

try {
    $query = "SELECT * FROM `gachiakuta`";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $resultaten = $stmt->fetchAll();
    $aantalRijen = count($resultaten);
    include 'views/index_view.php';

} catch (PDOException $e) {
    echo "<p>FOUT:</p>";
    echo "<p>Query: " . $query . "</p>";
    echo "<p>Foutmelding: " . $e->getMessage() . "</p>";
    exit;
}