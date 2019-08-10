<?php
    $con=mysqli_connect("127.0.0.1","root","","weilan");
    $gid=$_REQUEST["gid"];

    $sql="DELETE FROM shopcar WHERE gid = '$gid'";

    mysqli_query($con,$sql);

    $sql1 = "SELECT 
    shopcar.*,
    goodsList.book_title,
    goodsList.book_wlprice,
    goodsList.book_src 
    FROM shopcar , goodsList 
    WHERE shopcar.gid = goodsList.gid";
    $result1 = mysqli_query($con, $sql1);
    $data = mysqli_fetch_all($result1, MYSQLI_ASSOC);
    echo json_encode($data, true);
?>