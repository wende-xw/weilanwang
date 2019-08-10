<?php
    $con=mysqli_connect("127.0.0.1", "root", "", "weilan");
    $gid=$_REQUEST["gid"];
    $wlprice=$_REQUEST["wlprice"];
    $delprice=$_REQUEST["delprice"];

    //分两种情况
    //第一次添加该商品  插入数据
    $sql="SELECT * FROM shopcar WHERE gid = '$gid'";
    $result = mysqli_query($con,$sql);
    $row = mysqli_num_rows($result);

    if($row==0)
    {
        //购物车已经存在该商品  更新数据
        $insetSql="INSERT INTO `shopcar` (`carid`,`gid`,`num`,`wlprice`,`delprice`,`total`,`isActive`) VALUES (NULL,'$gid',1,'$wlprice','$delprice','$wlprice',1)";
        mysqli_query($con,$insetSql);
    
    }elseif ($row==1) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $num = $data[0]["num"] + 1;
        $total = $data[0]["wlprice"] * $num;

        // 更新数据库
        $updateSql="UPDATE shopcar SET num= $num ,total='$total' WHERE gid='$gid' ";
        mysqli_query($con,$updateSql);
    }

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


    // $totalCount="SELECT * FROM shopcar";
    // $result=mysqli_query($con,$totalCount);
    // $row=mysqli_num_rows($result);
    // echo '{"totalRow":'.$row.'}';
?>