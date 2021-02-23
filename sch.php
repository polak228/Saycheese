<?php
$date = date('dMYHis');
$imageData = $_POST["img"];

if( empty($imageData) ) {
  error_log("ERROR: noImg" . "\r\n", 3, "error.log");
}

$filteredData = substr($imageData, strpos($imageData, ",") + 1);
$unencodedData = base64_decode($filteredData);
$fp = fopen('img/' . $date . '.png', 'wb');
fwrite($fp, $unencodedData); fclose($fp);