<?php
$con = mysqli_connect("127.0.0.1", "root", "", "weilan");
$sql = "SELECT 
shopcar.*,
goodsList.book_title,
goodsList.book_wlprice,
goodsList.book_src,
goodsList.book_delprice
FROM shopcar , goodsList 
WHERE shopcar.gid = goodsList.gid";

// var_dump($sql);
 
$result = mysqli_query($con, $sql);

// var_dump($result);

$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);

?>