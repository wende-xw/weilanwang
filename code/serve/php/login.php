<?php
    #获取要提交的参数
    $username=$_REQUEST["username"];
    $password=$_REQUEST["password"];

    //连接数据库并在数据库中查询
    $con=mysqli_connect("127.0.0.1","root","","weilan");

    $sql="SELECT * FROM register WHERE useremail = '$username' or userphone = '$username'";
    $result=mysqli_query($con,$sql);
    $data=array("status" => "", "msg" => "", "data" => "");
    // echo $username.$password;
    // var_dump(mysqli_num_rows($result));
    // var_dump($result);
    $arr=mysqli_fetch_array($result);
    // var_dump($arr["password"]);

    if(mysqli_num_rows($result) == "0")
    {
        $data["status"]="error";
        $data["msg"]="登录失败，该用户不存在";
    }else {
        //检查密码是否正确
        if($arr["password"] != $password)
        {
            $data["status"]="error";
            $data["msg"]="登录失败：密码不正确！";
        }else{
            $data["status"]="success";
            $data["msg"]="恭喜你，登录成功！";
        }
    }

    echo json_encode($data,true);
?>