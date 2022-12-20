<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file = "../include/header.jsp" %>


<main id="main">
	<div class="breadcrumbs">
		<div class="page-header d-flex align-items-center"
			style="background-image: url('/img/month-cal-bg-2.jpg');">
			<div class="container position-relative">
				<div class="row d-flex justify-content-center">
					<div class="col-lg-6 text-center">
						<h2 data-aos="fade-up">회원 가입</h2>
						<p data-aos="fade-up" data-aos-delay="100">환영합니다! Nutrity의 새 멤버로 당신을 초대합니다!
																	<br> 혹시 이미 멤버이신가요? <a href="/login">여기에서</a> 로그인 하세요!</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<section id="FormSignup">
		<div data-aos="fade-up" class="container">
			<form action = "join" method = "post" class="form-group">
				<label for="username">아이디</label>
				<input class="form-control" type = "text" id = "username" name = "username"><br/>
				<label for="realname">이름</label>
				<input class="form-control" type = "text" id = "realname" name = "realname"><br/>
				<label for="useremail">이메일</label> 
				<div class="input-group mb-3">
  					<input type="text" class="form-control" placeholder="Useremail" id="usereamil" name="useremail">
  					<span class="input-group-text">@</span>
  					<input type="text" class="form-control" placeholder="example.com" id="server" name="server">
				</div>
<!-- 				<input class="form-control" type = "text" id = "useremail" name = "useremail"><br/> -->
				<label for="password">비밀번호</label> 
				<input class="form-control" type = "password" id = "password" name = "password"><br/>
				생일 : <input type = "text" id = "birth" name = "birth"><br/>
				나이 : <input type = "text" id = "age" name = "age"><br/>
				휴대전화 : <input type = "text" id = "phone" name = "phone"><br/>
				주소 : 
				<input type="text" id="zipcode" name = "zipcode" placeholder="우편번호">
				<input type="button" onclick="sample4_execDaumPostcode()" value="우편번호 찾기"><br>
				<input type="text" id="address1"  name = "address1" placeholder="도로명주소">
				<span id="guide" style="color:#999;display:none"></span>
				<input type="text" id="address2"  name = "address2" placeholder="상세주소">
				<br>
				남 : <input type = "radio" id = "gender" name = "gender" value = "man" checked/>
				여 : <input type = "radio" id = "gender" name = "gender" value = "woman" /><br/>       
				<button type = "submit" id = "JoinBtn">회원가입</button>
			</form>
		</div>
	</section>
</main>

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
$("#JoinBtn").click(function(){		
	if($("#username").val() == ""){
		alert("아이디를 입력해주세요.");
		return false;
	}	
	if($("#password").val() == ""){
		alert("비밀번호를 입력해주세요.");
		return false;
	}
	if($("#realname").val() == ""){
		alert("이름 입력해주세요.");
		return false;
	}
	if($("#useremail").val() == ""){
		alert("이메일을 입력해주세요.");
		return false;
	}
	if($("#server").val() == ""){
		alert("이메일을 입력해주세요.");
		return false;
	}
	if($("#birth").val() == ""){
		alert("생년월일을 입력해주세요.");
		return false;
	}
	if($("#age").val() == ""){
		alert("나이를 입력해주세요.");
		return false;
	}
	if($("#phone").val() == ""){
		alert("번호를 입력해주세요.");
		return false;
	}
	if($("#zipcode").val() == ""){
		alert("우편번호를 입력해주세요.");
		return false;
	}
	if($("#address1").val() == ""){
		alert("주소를 입력해주세요.");
		return false;
	}
})
    //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
    function sample4_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('zipcode').value = data.zonecode;
                document.getElementById("address1").value = roadAddr;               
                
                var guideTextBox = document.getElementById("guide");
                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                if(data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                    guideTextBox.style.display = 'block';

                } else if(data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                    guideTextBox.style.display = 'block';
                } else {
                    guideTextBox.innerHTML = '';
                    guideTextBox.style.display = 'none';
                }
            }
        }).open();      
    }
</script>

<%@ include file = "../include/footer.jsp" %>