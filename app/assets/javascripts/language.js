
        // url: "http://en.wikipedia.org/wiki/Special:Random",
		// url: "http://www.en.wikipedia.org/wiki/Riverbank_State_Park",


function get_content(url) {
	
	var xmlHttp = null;
	var resp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
	
	xmlHttp.onreadystatechange = function() {
	  if (xmlHttp.readyState == 4) {
	    // JSON.parse does not evaluate the attacker's scripts.
	    resp = xmlHttp.responseText;//JSON.parse();
	  }
	}
	
    xmlHttp.send();
    return resp;
}

function get_words(id) {
	
	var words_div = document.getElementById('words'); // get the div	
	
	// var data = get_content('http://www.en.wikipedia.org/wiki/Special:Random');
	// get_content('http://localhost:3000/projects')
	var data = get_content('http://localhost:3000/vox');
	// var data = get_content('http://en.wikipedia.org/wiki/Special:Random');
	// var data = get_content('https://www.google.ru/?gws_rd=cr');
	
	// var text = content.toString();
	// get_content('');

	var main = document.getElementById(id); // get the div	
	main.innerHTML = data;
	// var text = main.innerHTML;
	
	data = data.replace(/<[^>]*>/g, '');
	var pattern = /[a-zA-Z]{3,}/g;
	var match;
	var words = {};
			
	while (match = pattern.exec(data)) {
		// console.log(match[1]);
		var w = match[0].toLowerCase();
		if (words[w] == null) words[w] = 1;
		else words[w] = words[w] + 1;
	}
	
	var keys = getSortedKeys(words);

	for (var i = 0, len = keys.length; i < len; ++i) {
		
		var key = keys[i];

		if (words[key] > 2 && words[key] < 5) main.innerHTML = replaceAll(key, '<b>'+key+'</b>', main.innerHTML);		
		if (words[key] > 2 && words[key] < 5) words_div.innerHTML += (key + ': ' + words[key] + '</br>');
	}
	
	// main.innerHTML = data;
}

function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(b, a){return obj[a] - obj[b]});
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}
