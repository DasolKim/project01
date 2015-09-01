//$('#loginBtn').on('click', function(event) {})	
//click 이벤트에 이벤트리스너를 등록.
define('auth', function() {

	return {
		init: function() {
		
			$('#loginBtn2').click(function(event) {
				event.preventDefault();
				$.getJSON(contextRoot + '/json/auth/login.do', 
						{
					email: $('#email').val(),
					password: $('#password').val()
						},	
						function(result) {
							if(result.data == 'yes') {	//로그인 성공시
								//$('#content').load('sub/board.html'); auth가 main의 content를 load.
								//document객체에 대해서 이벤트를 발생시키고 발생한 그 이벤트를 main(app.js)에 알려줌.
								$(document).trigger('login.success');
							} else {
								//로그인 실패 메시지 출력하기
								$('#message').text('이메일 또는 암호가 일치하지 않습니다.');
							}
						});
			});

//			input박스에 대해서 focus 이벤트가 발생하면 message를 ''(빈문자)로 한다.
			$('input').focus(function(event) {	
				$('#message').text('');
			});

			/*function jQuery() {}

var $ = jQuery;    $ : 특수기호(x) 함수이름(o)*/
		}
	};
});