<?php

header("Content-Type: text/html;charset=utf-8"); 

$con=mysqli_connect("127.0.0.1","root","","weilan");
if($con){
    echo 1;
}
$json=file_get_contents("../../html/data.json");

$data=json_decode($json,true);
// var_dump($data);
for($i=0;$i<count($data);$i++)
{
    var_dump($data[$i]);
    $src=$data[$i]["src"];
    $bookTitle=$data[$i]["bookTitle"];
    $author=$data[$i]["author"];
    $publish=$data[$i]["publish"];
    $isbn=$data[$i]["isbn"];
    $time=$data[$i]["time"];
    $detail=$data[$i]["detail"];
    $wlprice=$data[$i]["wlprice"];
    $delprice=$data[$i]["delprice"];
    $btn_buy=$data[$i]["btn_buy"];
    $emprice=$data[$i]["emprice"];

    // $sql="INSERT INTO `goodslist` (`gid`,`book_title`)

    $sql="INSERT INTO `goodslist` 
    (`gid`, 
    `book_title`, 
    `book_author`, 
    `book_publish`, 
    `book_src`, 
    `book_isbn`, 
    `book_time`,
    `book_detail`,
    `book_wlprice`,
    `book_delprice`,
    `book_emprice`,
    `book_btn_buy`) VALUES 
    ('$i', 
    '$bookTitle', 
    '$author', 
    '$publish', 
    '$src', 
    '$isbn', 
    '$time',
    '$detail',
    '$wlprice',
    '$delprice',
    '$emprice',
    '$btn_buy')";

    mysqli_query($con,$sql);
}
?>