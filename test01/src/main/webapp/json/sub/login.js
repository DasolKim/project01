// 사용자 정보 감추기
$('userInfo').css('display','none');

//로그인 정보 가져오기
//getJSON의 역할 두가지(서버에게 요청하고, 성공했을 때 실행할 함수 등록)
//상대경로 위험하므로 절대경로. (서버에 요청했을 때 변경될수 있으므로)
$.getJSON(contextRoot + '/json/auth/loginInfo.do', function(result) {
	if(result.state == 'yes') {	// 로그인 상태.
		$('#userName').text(result.data.name);
		$('#userEmail').text(result.data.email);
		$('#loginBtn').css('display', 'none');
		$('#userInfo').css('display','');
	} else {	// 로그인 상태 아님.
		$('#loginBtn').css('display', '');
		$('#userInfo').css('display','none');
	}
});

$('#loginBtn').click(function(event) {
	event.preventDefault();
	// 현재 URL 정보를 알아낸다.
	$.getJSON(contextRoot + '/json/auth/setRefererUrl.do',
		{refererUrl: encodeURIComponent(location.href)},
		function(result) {
		location.href = contextRoot + '/json/auth/index.html';
	});
});

$('#logoutBtn').click(function(event) {
	event.preventDefault();
	$.getJSON(contextRoot + '/json/auth/logout.do',function(result) {
		location.href = contextRoot + '/json/auth/index.html';
		
	});
});