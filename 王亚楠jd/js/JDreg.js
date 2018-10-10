//设置用户名
var nameInput = document.getElementById("nameInput");
var namep = document.getElementById("Name-p");
var ocommon = document.querySelectorAll(".common");
ocommon.onfocus = function(){
	ocommon.style.borderColor = "#444";
	ocommon.style.color = "#222";
}
nameInput.onfocus = function(){
	nameInput.value = "";
	namep.style.display = "block";
		
}
nameInput.onblur = function(){
	var snameValue = nameInput.value;
	var reg = /^[\u4e00-\u9fa5a-zA-Z0-9\-_]{4,20}$/;
	var regNumber = /^\d+$/;
	if(regNumber.test(snameValue)){
		
		namep.style.color = "orange";
        namep.innerHTML = "用户名不能为纯数字";
        return 0;
    }
	if(reg.test(snameValue)){
		namep.style.display = "none";
	}else{
		namep.style.color = "red";
		namep.innerHTML = "按规定输入字数";
	}
}

//设置密码
var setPwd = document.getElementById("setPwd");
var pwdp = document.getElementById("pwd-p");
setPwd.onfocus = function(){
	setPwd.value = "";
	pwdp.style.display = "block";
}
setPwd.onblur = function(){
	var regPwd = /^[a-z0-9\!\@\#\$\%\^\&\*\(\)\_]{6,20}$/;
	var spwd = setPwd.value;
	if (regPwd.test(spwd)) {
		var rate = 0;
		var regNum = /\d/;
		var regWord = /[a-z]/;
		var regSympol = /[\!\@\#\$\%\^\&\*\_]/;
		if (regNum.test(spwd)) {
			rate++;
		}
		if(regWord.test(spwd)){
            rate++;
        }
        if(regSympol.test(spwd)){
            rate++;
        }
        switch (rate){
        	case 1: {
        			pwdp.style.color = "red";        			
        			pwdp.innerHTML = "密码强度较低";
        			break;
        	}
        	case 2: {
        			pwdp.style.color = "orange";        			
        			pwdp.innerHTML = "密码强度中等";
        			break;
        	}
        	case 3: {
        			pwdp.style.color = "green";       			
        			pwdp.innerHTML = "你的密码很安全";
        			break;
        	}
        	
        }
                
	}else{
		pwdp.innerHTML = "请输入数字字母特殊符号至少两种组成的6~20位密码";
		setPwd.focus();
	}
	
}

//再次确认密码
var retPwd = document.getElementById("retPwd");
var repwdp = document.getElementById("repwd-p");

retPwd.onfocus = function(){
	retPwd.value = "";
	repwdp.style.display = "block";
	repwdp.innerHTML = "请输入相同的密码";
}

retPwd.onblur = function(){	
	if (retPwd.value==setPwd.value){
		repwdp.style.display = "none";
	//	repwdp.innerHTML = "密码输入正确";
		//console.log(1);
		
	} else{
		repwdp.style.color = "red";
		repwdp.innerHTML = "密码输入错误";
		//console.log(2);
		
	}
}


var oemail = document.getElementById("email");
var emailp = document.getElementById("emailp");
oemail.onfocus = function(){
	oemail.value = "";
	emailp.style.display = "block";
	emailp.innerHTML = "请输入你的邮箱";
}

oemail.onblur = function(){
	var semail = oemail.value;
	var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	if (reg.test(semail)) {
		emailp.style.display = "none";
	} else{
		emailp.style.color = "red"
		emailp.innerHTML = "请输入正确格式的邮箱";
	}
}


//注册
var oBtn = document.getElementById("regBtn");
var username = document.getElementById("nameInput");
var userpassword = document.getElementById("setPwd");
var useremail = document.getElementById("email");


var box = document.getElementById("box");
oBtn.onclick = function(){
	var sUser = username.value;
	var sPwd = userpassword.value;
	var sEmail = useremail.value;
	ajaxPost("http://localhost:80/1814PHP/jd/php/register.php",`nameInput=${sUser}&setPwd=${sPwd}&email=${sEmail}`)
	.then(
		//console.log(sUser,sPwd,sEmail);
		function(res){
			box.innerHTML = res;
			if (res == 1) {
				alert("注册成功！");
				location.href = "http://localhost/1814PHP/jd/index6.html";
			}
		}
		
	)
}



















































