<?php
    header("Content-Type: text/html;charset=utf-8");

    $con=mysqli_connect("127.0.0.1","root","","weilan");

    $page = $_REQUEST["page"] * 20;

    $typeOrder=$_REQUEST["orderType"];

    if($typeOrder == 0)
    {
        // echo 000;
        $sql="SELECT * FROM `goodslist` order by `gid` limit $page , 20";
    }else if($typeOrder==1){
        //按价格排序
        // echo 111;
        $sql="SELECT * FROM `goodslist` order by `book_wlprice` desc limit $page , 20";
    }else if($typeOrder==2){
        // echo 222;
        $sql="SELECT * FROM `goodslist` order by `book_wlprice` asc limit $page , 20";
    }

    $result=mysqli_query($con,$sql);


    // var_dump(mysqli_fetch_all($result,MYSQLI_ASSOC))

    $data=array(
        "status"=>"success","msg"=>"请求成功",
        "data"=>mysqli_fetch_all($result,MYSQLI_ASSOC));

    
    $arr=$data;
    // var_dump($arr);
    echo json_encode($data,true);
?>