<?php
    $con=mysqli_connect("127.0.0.1","root","","weilan");
    $gid=$_REQUEST["gid"];

    $sql="SELECT * FROM  shopcar WHERE gid = '$gid'";

    $result=mysqli_query($con,$sql);

    $data=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $num=$data[0]["num"]-1;
    $total=$data[0]["wlprice"] * $num;

    // echo $total;

    if($num==0){
        $sql="DELETE FROM shopcar WHERE gid = '$gid'";
        mysqli_query($con, $sql);
    }else {
        $updateSql = "UPDATE shopcar SET num='$num',total='$total' WHERE gid=' $gid'";
        mysqli_query($con, $updateSql);
    }


    

    // $sqlnum="SELECT * FROM  shopcar WHERE gid = '$gid'";
    // $result=mysqli_query($con,$sqlnum);
    // $data=mysqli_fetch_all($result,MYSQLI_ASSOC);
    // echo $data[0]["num"];
?>