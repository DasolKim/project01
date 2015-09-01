// $('#loginBtn').on('click', function(event) {})	
// click 이벤트에 이벤트리스너를 등록.
$('#loginBtn').click(function(event) {
	
	$.getJSON('login.do', 
		{
		  email: $('#email').val(),
		  password: $('#password').val()
		},	
		function(result) {
		  if(result.data == 'yes') {
			if(result.refererUrl != undefined) {
			  location.href = decodeURIComponent(result.refererUrl);
			} else {
			  location.href = '../board/index.html';
			}
		  } else {
			//로그인 실패 메시지 출력하기
			$('#message').text('이메일 또는 암호가 일치하지 않습니다.');
		  }
		
	});
});

// input박스에 대해서 focus 이벤트가 발생하면 message를 ''(빈문자)로 한다.
$('input').focus(function(event) {	
	$('#message').text('');
});

/*function jQuery() {}

var $ = jQuery;    $ : 특수기호(x) 함수이름(o)*/