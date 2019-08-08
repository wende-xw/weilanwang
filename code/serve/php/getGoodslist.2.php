<?php
    header("Content-Type: text/html;charset=utf-8");

    $con=mysqli_connect("127.0.0.1","root","","weilan");

    $page = $_REQUEST["page"] * 20;

    $typeOrder=$_REQUEST["orderType"];

    // $sql="SELECT * FROM `goodslist` order by `gid` limit $page , 20";

    if($typeOrder==0)
    {
        $sql="SELECT * FROM `goodslist` order by `gid` limit $page , 20";
    }else if($typeOrder==1){
        $sql="SELECT * FROM `goodslist` WHERE `book_wlprice` between 0 and 5";
    }else if($typeOrder==2){
        $sql="SELECT * FROM `goodslist` WHERE `book_wlprice` between 5 and 10";
    }else if($typeOrder==3){
        $sql="SELECT * FROM `goodslist` WHERE `book_wlprice` between 10 and 15";
    }else if($typeOrder==4){
        $sql="SELECT * FROM `goodslist` WHERE `book_wlprice` between 15 and 20";
    }else if($typeOrder==5){
        $sql="SELECT * FROM `goodslist` WHERE `book_wlprice` between 20 and 30";
    }else if($typeOrder==6){
        $sql="SELECT * FROM `goodslist` WHERE `book_wlprice` between 30 and 50";
    }else if($typeOrder==7){
        $sql="SELECT * FROM `goodslist` WHERE `book_wlprice` between 50 and 1000000";
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