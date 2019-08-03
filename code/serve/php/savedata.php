<?php

header("Content-Type: text/html;charset=utf-8"); 

    $weilan = mysqli_connect("127.0.0.1","root","","weilan");

    $data=file_get_contents("nav.json");
    $arr=json_decode($data,true);
    // var_dump($arr);
    

    echo "<br>";
    for($i=0;$i<count($arr);$i++){
        $title=$arr[$i]["title"];
        $kind=json_encode($arr[$i]["kind"],true);
        // var_dump(json_decode($kind,true));

        $sql="INSERT INTO `nav`(`title`, `kind`) VALUES ('$title','$kind')";
        // // echo $sql;
        // // echo '<br>';
        $ok = mysqli_query($weilan,$sql);
        var_dump($ok);
    }
    

?>