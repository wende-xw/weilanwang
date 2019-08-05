<?php
    $con=mysqli_connect("127.0.0.1","root","","weilan");

    $useremail = $_REQUEST["useremail"];
    $password = $_REQUEST["password"];


    $sql1 = "SELECT 'useremail' FROM  register WHERE useremail = '$useremail'";
    $result1=mysqli_query($con,$sql1);

    $data=array("status"=>"","msg"=>"","data"=>"");
    // var_dump(mysqli_num_rows($result1));

    if(mysqli_num_rows($result1) == "1")
    {   
        $data["status"] = "error";
        $data["msg"] = "注册失败：该用户名已被注册";
    }else{
        $sql2="INSERT INTO `register` (`useremail`, `password`) VALUES ('$useremail', '$password')";
        mysqli_query($con,$sql2);

        $data["status"] = "success";
        $data["msg"] = "恭喜你，注册成功！";
        
    }
    echo json_encode($data,true);
?>