var currPageNo = 1;
var pageSize = 3;

$('.my-view').css('display','none')
$('.my-new').css('display','')

listMember(currPageNo, pageSize);

var prevBtn = $('#prevBtn');
prevBtn.click(function(event) {
  event.preventDefault();
  // 이벤트리스너에서의 this는 순수한 엘리먼트 객체이기 때문에 $(this).
  // 그 this를 . 가공함.
  if ($(this).attr('disabled') == 'disabled') {
    return;
  }

  //이전 페이지 목록 가져오기
  listMember(currPageNo - 1, pageSize);
});

var nextBtn = $('#nextBtn');
nextBtn.click(function(event) {
  event.preventDefault();
  if (this.getAttribute('disabled') == 'disabled') {
    return;
  }
  //다음 페이지 목록 가져오기
  listMember(currPageNo + 1, pageSize);
});

var deleteBtn = $('#deleteBtn');
deleteBtn.click(function(event) {
	event.preventDefault();
	deleteMember($('#fNo').val());	//deleteBoard 호출. 테스트할때는 alert($('#fNo').val());
//	listBoard(currPageNo, pageSize); 
// 	deleteBoard를 호출했다고 해서 그 안에 있는 모든 내용이 실행되는 것이 아님. 
//  function()은 서버에서 요청한 것이 와야 실행됨. getJSON의 역할은 서버에 요청만 하고 바로 return 됨. 
//  deleteBoard 호출하고 바로 listBoard가 실행됨. 
//  서버에서 deleteBoard에 있는 function()에 대한 요청을 먼저 처리할지 listBoard에 있는 function()에 대한 요청을 먼저 처리할지 알 수 없음.
// 	그러므로 이렇게 했을 경우 delete하고 난 후의 목록이 올 수도 있고 delete하기 전의 목록이 올 수도 있음.
});

var updateBtn = $('#updateBtn');
updateBtn.click(function(event) {
	event.preventDefault();
	updateMember();	
});

var insertBtn = $('#insertBtn');
insertBtn.click(function(event) {
	event.preventDefault();
	insertMember();	
});

var cancelBtn = $('#cancelBtn');
cancelBtn.click(function(event) {
	$('.my-view').css('display','none')
	$('.my-new').css('display','')
});

function listMember(pageNo, pageSize) {
  $.getJSON('list.do', 
    {
      pageNo: pageNo,
      pageSize: pageSize,
    }, 
    function(result) {
      window.currPageNo = result.pageNo;
      $('#pageNo').text(currPageNo);
      
      var tbody = $('#listTable tbody');
      $('.data-row').remove();
      
      var source = $('#template1').html(); // 파라미터 값을 주지 않으면 getter. 시작태그와 끝태그 있는 값
      var template = Handlebars.compile(source);  //templateSource를 컴파일해서 관리하기 좋게 template라는 객체로 만듬.
      var content = template(result);
      $('#listTable tbody').html(content);
      
      // 이전, 다음 버튼 처리
      if (result.pageNo > 1) {
        prevBtn.removeAttr('disabled');
        prevBtn.attr('href', 'list.do?pageNo=' 
          + (result.pageNo - 1) 
          + '&pageSize=' + result.pageSize); 
      } else {
        prevBtn.attr('disabled', 'disabled');
      }
      
      if (result.isNextPage) {
        nextBtn.removeAttr('disabled');
        nextBtn.attr('href', 'list.do?pageNo=' 
          + (result.pageNo + 1) 
          + '&pageSize=' + result.pageSize);
      } else {
        nextBtn.attr('disabled', 'disabled');
      }
      $('.nameLink').click(function(event){
    	  event.preventDefault();
    	  detailMember(this.getAttribute('mno'));
    	  $('.my-view').css('display','')
    	  $('.my-new').css('display','none')
      });
  });
}

function detailMember(no) {
	$.getJSON('detail.do?no='+no, function(result) {	
		var data = result.data;
		
		//console.log(data);
		//detail.json의 내용을 테스트할 경우 
		//$.getJSON('detail.json?no='+no, function(result)으로 test
		$('#fNo').val(data.no);
		$('#fName').val(data.name);
		$('#fEmail').val(data.email);
		$('#fPassword').val(data.password);
		$('#fTel').val(data.tel);
		$('#fCreateDate').text(data.yyyyMMdd);	//input, textarea 박스가 아니라 a, p태그일 때 .val (x) .text(o)
		$('#fPhoto').text(data.photo)
						 .attr('href','../../files/' + data.photo);
	});
}

function deleteMember(no) {
	$.getJSON('delete.do?no='+no, function(result) {	
		if(result.data == 'success') {
			alert('삭제 성공입니다.');
			listMember(currPageNo, pageSize);
			$('#cancelBtn').click();
		} else {
			alert('삭제할 수 없습니다.')
		}
		
	});
}

function updateMember() {
	$.ajax('update.do',		//url, settings 정보(method, dataType, data(no, title, content-> form에 input 엘리먼트 값))
	  {
		method: 'POST',
		dataType: 'json',
		data: {
			no: $('#fNo').val(),
			name: $('#fName').val(),
			email: $('#fEmail').val(),
			tel: $('#fTel').val(),
			password: $('#fPassword').val()
			},
		success: function(result) {	
			if(result.data == 'success') {
				alert('변경 성공입니다.');
				listMember(currPageNo, pageSize);
				$('#cancelBtn').click();
			} else {
				alert('변경할 수 없습니다.')
			}
	  }
	});
}

function insertMember() {
	$.ajax('insert.do',		//url, settings 정보(method, dataType, data(no, title, content-> form에 input 엘리먼트 값))
	  {
		method: 'POST',
		dataType: 'json',
		data: {
			name: $('#fName').val(),
			email: $('#fEmail').val(),
			tel: $('#fTel').val(),
			password: $('#fPassword').val()
			},
		success: function(result) {	
			if(result.data == 'success') {
				alert('입력 성공입니다.');
				listMember(1, pageSize);
				$('#cancelBtn').click();
			} else {
				alert('입력할 수 없습니다.')
			}
	  }
	});
}

//로그인 HTML 가져오기
//내부적으로 ajax를 요청하여 html을 가져온다.
$('#header').load('../sub/login.html');