<?php
    $con=mysqli_connect("127.0.0.1","root","","weilan");

    $userphone = $_REQUEST["userphone"];
    $password = $_REQUEST["password"];
    // var_dump($userphone);

    $sql1 = "SELECT 'userphone' FROM  register WHERE userphone = $userphone ";
    $result=mysqli_query($con,$sql1);

    $data=array("status"=>"","msg"=>"","data"=>"");
    // var_dump(mysqli_num_rows($result));

    if(mysqli_num_rows($result) == "1")
    {   
        $data["status"] = "error";
        $data["msg"] = "注册失败：手机已被注册";
    }else{
        $sql2="INSERT INTO `register` (`userphone`, `password`) VALUES ('$userphone', '$password')";
        mysqli_query($con,$sql2);

        $data["status"] = "success";
        $data["msg"] = "恭喜你，注册成功！";
        
    }
    echo json_encode($data,true);
?>