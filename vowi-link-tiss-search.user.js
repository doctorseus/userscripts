// ==UserScript==
// @name TISS Search in VoWi
// @namespace https://fsinf.at/
// @match https://vowi.fsinf.at/wiki/*
// @match https://tiss.tuwien.ac.at/course/courseList.xhtml*
// @description Does not work with Greasemonkey because of https://github.com/greasemonkey/greasemonkey/issues/2700
// @version 1.4
// @downloadURL https://fsinf.at/userscripts/vowi-link-tiss-search.user.js
// @updateURL   https://fsinf.at/userscripts/vowi-link-tiss-search.user.js
// ==/UserScript==

if (location.host == 'vowi.fsinf.at') {
	if (document.getElementById('lva-daten') != null) {
		var content = document.getElementById('mw-content-text');
		var div = document.createElement('div');
		content.insertBefore(div, content.firstChild);
		var a = document.createElement('a');
		div.insertBefore(a, div.firstChild);
		a.setAttribute('target', '_blank');
		a.innerHTML = 'TISS Suche';
		var heading = document.getElementById('firstHeading').innerHTML;
		var title = encodeURIComponent(heading.substring(heading.indexOf(':') + 1, heading.indexOf('(') - 4));
		var type = encodeURIComponent(heading.substr(heading.indexOf('(') - 3, 2));
		a.href = 'https://tiss.tuwien.ac.at/course/courseList.xhtml?title=' + title + '&type=' + type;
	}
} else if (location.host == 'tiss.tuwien.ac.at') {
	var params = new URL(location).searchParams;
	if (params.get('title')) {
		jsf.ajax.addOnEvent(function (data) {
			if (data.status == 'success') {
				document.getElementById('courseList:courseTitleInp').value = params.get('title');
				document.getElementById('courseList:courseType').value = params.get('type');
				var select = document.getElementById('courseList:semFrom')
				select.value = select.children[select.children.length - 1].value;
				document.getElementById('courseList:cSearchBtn').click();
			}
		})
		document.getElementById('courseList:quickSearchPanel').children[0].lastElementChild.click()
	} else {
		var titleInput = document.getElementById('courseList:courseTitleInp');
		if (titleInput) {
			document.getElementById('courseList:courseLecturer').focus()
			window.find(titleInput.value);
		}
	}
}
