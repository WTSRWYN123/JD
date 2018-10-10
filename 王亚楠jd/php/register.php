<?php
	$username = @$_POST["nameInput"];//加@防止数据为空
	$userpassword = @$_POST["setPwd"];
	$useremail = @$_POST["email"];
	$userpassword = md5($userpassword);
	
	if($username == "" || $userpassword == "" || $useremail == ""){
        // 只要 php 碰到了 die 其后代码不执行; 
        die("参数不全,缺少账号或密码");
    }
    
    $con = mysql_connect("localhost","root","123456");
    if(!$con){
    	die("数据库连接失败".mysql_error());
    }
    
    mysql_select_db("userlist",$con);
    if(mysql_error()){
    	die("数据库选中失败".mysql_error());
    }
    
     // 插入之前进行判断数据库中是否有重名
	$sql_select_all = "SELECT userName FROM JDReg WHERE userName='$username'";   
	$select_res = mysql_query($sql_select_all); 
	  // 遍历数据库资源方式;
    while($row = mysql_fetch_array($select_res)){
    	if($row["userName"] == $username){
    		die("用户重名".mysql_error());
    	}
    }
    
    $sql_list_item = "INSERT INTO JDReg (userName , userPassword , userEmail) 
                        VALUES
                        ( '$username' , '$userpassword','$useremail');
                        ";
    $insert_res = mysql_query($sql_list_item);//mysql_query() 在执行成功时返回 TRUE，出错时返回 FALSE，赋值会隐式转换为1 || 0
    if(! $insert_res){//条件为假
    	echo "数据库插入错误".mysql_error();
    }
    
    echo 1;
    
    mysql_close($con);

    
?>