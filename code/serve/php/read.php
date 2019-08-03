<?php
header("Content-Type: text/html;charset=utf-8"); 
    //链接数据库
    $db=mysqli_connect("127.0.0.1","root","","weilan");
    // if($db){
    //     echo 1;
    // };

    //获取所有商品信息
    $query="SELECT * FROM  nav";

    //执行
    $result=mysqli_query($db,$query);

    $note;$i=0;
    // $data=array("data"=>mysqli_fetch_all($result,MYSQLI_ASSOC));
    // echo json_encode($data,true);


    // var_dump($data);
    $data1=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo $data=array("data1"=>$data1);
    echo json_encode($data,true)

?>