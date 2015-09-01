var contextRoot = '/web02';

//window에 있는 moduleMap(window에서 관리하는 전문적인 객체)이라는 빈객체를 만듬.
window.moduleMap = {};
window.moduleLoadEvent = {};

function define(moduleName, func) {
	//window.moduleMap에 moduleName이라는 프로퍼티값이 있고 그 것에 func()을 저장.
	window.moduleMap[moduleName] = func();
}

//동일한 모듈을 반복하지 않도록 해줌
function requirejs(moduleName, cb) {
	//moduleName에 해당되는 것이 moduleMap에 정의되지 않았다면 
	//module을 로딩하는 script 태그를 붙여 실행. module이 로딩된다 
	//-> window에 해당 모듈이 정의됨.
	if (window.moduleMap[moduleName] == undefined) {
    window.moduleLoadEvent[moduleName] = cb;
		$('<script>')
		.attr('src', 
				contextRoot + '/json2/sub/' 
				+ moduleName + '.js')
				.attr('async', true)
				.attr('type', 'text/javascript')
				.appendTo('#content'); //content의 막내자식으로 script 태그를 집어넣어라(추가하라). 
		//위의 script(.js 로딩시키는 역할)만 있으면 function이 다 실행될 때까지 목록이 뜨지 않는다.
		//moduleName에 해당하는 html을 content의 막내자식으로 로딩.(html 호출)
		//window.moduleLoadEvent['board'](
		// 	window.moduleMap['board']); 의 역할을 함.
		$('<script>')	
		.attr('async', true)
		.attr('type', 'text/javascript')
		.html('window.moduleLoadEvent["' + moduleName + '"]'
				+ '(window.moduleMap["' + moduleName + '"]);')
		.appendTo('#content');
		
	} else { 
		//moduleName에 해당되는 것이 window의 moduleMap에 정의되어 있다면 
		//cb(callback) 함수에 moduleName에 해당하는 객체를 parameter 값으로 넘겨준다.
		cb(window.moduleMap[moduleName]);
	}
}