<?php
    #连接数据库
    $con=mysqli_connect("127.0.0.1","root","","weilan");

    #查询数据库中商品的总数量
    $sql="SELECT * FROM goodslist";
    $result=mysqli_query($con,$sql);
    $ListCount=mysqli_num_rows($result);
    // var_dump($ListCount);

    $count=20;
    $pageCount=ceil($ListCount/$count);

    $data= array("status"=>"success","msg"=>"获取成功","data"=>array("count"=> $pageCount));
    // var_dump($data);

    echo json_encode($data,true);
?>