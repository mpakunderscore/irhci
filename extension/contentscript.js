// lang:text_words_div
function get_words() {
		
	// var words_div = document.getElementById('words'); // get the div	
	var words_div = document.createElement('div');
	if (true) {
		words_div.setAttribute("id", "reddit");
	}
	
	// var data = get_content('http://www.en.wikipedia.org/wiki/Special:Random');
	// get_content('http://localhost:3000/projects')
	// var data = get_content('http://localhost:3000/vox');
	// var data = get_content('http://en.wikipedia.org/wiki/Special:Random');
	// var data = get_content('https://www.google.ru/?gws_rd=cr');
	
	// var text = content.toString();
	// get_content('');

	// var main = document.getElementById('bodyContent'); // wiki
	
	var post = document.getElementsByClassName("content")[1]; //reddit post
	var main = document.getElementsByClassName("content")[2]; //reddit comments
	
	var time = new Date().getTime();
	// console.log(time);
	
	// main.innerHTML = data;
	// var text = main.innerHTML;
	data = main.innerText + post.innerText;	
	data = data.replace(/<[^>]*>/g, '');
	var pattern = /[a-zA-Z]{4,}/g;
	var match;
	var words = {};
	
	var wes = getWordExceptions('reddit');
	
	while (match = pattern.exec(data)) {
		// console.log(match[1]);
		var w = match[0].toLowerCase();
		
		if (wes.indexOf(w) > -1) continue;
		
		if (words[w] == null) words[w] = 1;
		else words[w] = words[w] + 1;
	}
	

	
	console.log((new Date().getTime() - time)/1000);	
	time = new Date().getTime();	
	
	var keys = getSortedKeys(words);	
	// chrome.runtime.sendMessage( 'keys', keys.length, function(response) {
	// 	var lastError = chrome.runtime.lastError;
	// 	if (lastError) {
	// 		console.log(lastError.message);
	// 		// 'Could not establish connection. Receiving end does not exist.'
	// 		return;
	// 	}
	// 	// Success, do something with response...
	// });
		
	// alert(keys.length);
	
	words_div.innerHTML = '~ ' + keys.length + '</br>';
	for (var i = 0, len = keys.length; i < len; ++i) {		
		var key = keys[i];
		if (words[key] > 1 && words[key] < 5) 
		// words_div.innerHTML += (key + ': ' + words[key] + '</br>');
		words_div.innerHTML += ('<a id="'+key+'" title="'+key+'">'+key+'</a>' + '</br>');
	}
	
	document.body.appendChild(words_div);
	
	console.log((new Date().getTime() - time)/1000);
	time = new Date().getTime();
	
	// if (words[key] > 2 && words[key] < 5) main.innerHTML = replaceAll(key, '<b>'+key+'</b>', main.innerHTML);		
	
	// if (words[key] > 2 && words[key] < 5) 
	var main_html = main.innerHTML;
	for (var i = 0, len = keys.length; i < len; ++i) {		
		var key = keys[i];
		// console.log(key);
		
		if (words[key] > 1 && words[key] < 5);
			// main_html = main_html.replace(new RegExp(key+'(?=(\s|[a-zA-Z0-9-().\s])*<)'), '<a class="word" id="'+key+'" title="'+key+'">'+key+'</a>'); //onclick="know(this)" 
	}
	
	console.log((new Date().getTime() - time)/1000 + " replace " + keys.length);
	time = new Date().getTime();		
	main.innerHTML = main_html;
	console.log((new Date().getTime() - time)/1000);		
	time = new Date().getTime();	
	
	// for (var i = 0, len = keys.length; i < len; ++i) {		
	// 	if (words[key] > 7) {
	// 		var link = document.getElementById(key);
	// 		link.onclick = function() {alert(key);}
	// 	}
	// }
	// 
	// console.log((new Date().getTime() - time)/1000 + ' sec.');		
	
}

function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(b, a){return obj[a] - obj[b]});
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function getWordExceptions(source) {
	
	var out = [];
	
	var thousand = ['a', 'able', 'about', 'above', 'according', 'account', 'across', 'act', 'action', 'activities', 'activity', 'actually', 'added', 'addition', 'additional', 'administration', 'after', 'again', 'against', 'age', 'ago', 'ahead', 'aid', 'air', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'am', 'america', 'american', 'among', 'amount', 'an', 'analysis', 'and', 'another', 'answer', 'anti', 'any', 'anyone', 'anything', 'apparently', 'appear', 'appeared', 'approach', 'are', 'area', 'areas', 'arms', 'army', 'around', 'art', 'as', 'ask', 'asked', 'association', 'at', 'attack', 'attention', 'audience', 'available', 'average', 'away', 'b', 'back', 'bad', 'ball', 'based', 'basic', 'basis', 'be', 'beautiful', 'became', 'because', 'become', 'bed', 'been', 'before', 'began', 'beginning', 'behind', 'being', 'believe', 'below', 'best', 'better', 'between', 'beyond', 'big', 'bill', 'black', 'blood', 'blue', 'board', 'body', 'book', 'born', 'both', 'boy', 'boys', 'bring', 'british', 'brought', 'brown', 'building', 'built', 'business', 'but', 'by', 'c', 'call', 'called', 'came', 'can', 'cannot', 'cant', 'car', 'care', 'carried', 'cars', 'case', 'cases', 'cause', 'cent', 'center', 'central', 'century', 'certain', 'certainly', 'chance', 'change', 'changes', 'character', 'charge', 'chief', 'child', 'children', 'choice', 'christian', 'church', 'city', 'class', 'clear', 'clearly', 'close', 'closed', 'club', 'co', 'cold', 'college', 'color', 'come', 'comes', 'coming', 'committee', 'common', 'communist', 'community', 'company', 'complete', 'completely', 'concerned', 'conditions', 'congress', 'consider', 'considered', 'continued', 'control', 'corner', 'corps', 'cost', 'costs', 'could', 'couldnt', 'countries', 'country', 'county', 'couple', 'course', 'court', 'covered', 'cut', 'd', 'daily', 'dark', 'data', 'day', 'days', 'de', 'dead', 'deal', 'death', 'decided', 'decision', 'deep', 'defense', 'degree', 'democratic', 'department', 'described', 'design', 'designed', 'determined', 'developed', 'development', 'did', 'didnt', 'difference', 'different', 'difficult', 'direct', 'direction', 'directly', 'distance', 'district', 'do', 'does', 'doing', 'done', 'dont', 'door', 'doubt', 'down', 'dr', 'drive', 'due', 'during', 'e', 'each', 'earlier', 'early', 'earth', 'east', 'easy', 'economic', 'education', 'effect', 'effective', 'effects', 'effort', 'efforts', 'eight', 'either', 'elements', 'else', 'end', 'england', 'english', 'enough', 'entire', 'equipment', 'especially', 'established', 'europe', 'even', 'evening', 'ever', 'every', 'everything', 'evidence', 'example', 'except', 'existence', 'expect', 'expected', 'experience', 'extent', 'eye', 'eyes', 'f', 'face', 'fact', 'faith', 'fall', 'family', 'far', 'farm', 'father', 'fear', 'federal', 'feed', 'feel', 'feeling', 'feet', 'felt', 'few', 'field', 'figure', 'figures', 'filled', 'final', 'finally', 'find', 'fine', 'fire', 'firm', 'first', 'fiscal', 'five', 'floor', 'followed', 'following', 'food', 'foot', 'for', 'force', 'forces', 'foreign', 'form', 'former', 'forms', 'forward', 'found', 'four', 'free', 'freedom', 'french', 'friend', 'friends', 'from', 'front', 'full', 'function', 'further', 'future', 'g', 'game', 'gave', 'general', 'generally', 'george', 'get', 'getting', 'girl', 'girls', 'give', 'given', 'gives', 'glass', 'go', 'god', 'going', 'gone', 'good', 'got', 'government', 'great', 'greater', 'green', 'ground', 'group', 'groups', 'growing', 'growth', 'gun', 'h', 'had', 'hair', 'half', 'hall', 'hand', 'hands', 'happened', 'hard', 'has', 'have', 'having', 'he', 'head', 'hear', 'heard', 'heart', 'heavy', 'held', 'hell', 'help', 'her', 'here', 'herself', 'hes', 'high', 'higher', 'him', 'himself', 'his', 'history', 'hit', 'hold', 'home', 'hope', 'horse', 'hospital', 'hot', 'hotel', 'hour', 'hours', 'house', 'how', 'however', 'human', 'hundred', 'husband', 'i', 'idea', 'ideas', 'if', 'ill', 'im', 'image', 'immediately', 'important', 'in', 'include', 'including', 'income', 'increase', 'increased', 'indeed', 'individual', 'industrial', 'industry', 'influence', 'information', 'inside', 'instead', 'interest', 'international', 'into', 'involved', 'is', 'island', 'issue', 'it', 'its', 'itself', 'ive', 'j', 'job', 'john', 'just', 'justice', 'keep', 'kennedy', 'kept', 'kind', 'knew', 'know', 'knowledge', 'known', 'l', 'labor', 'lack', 'land', 'language', 'large', 'larger', 'last', 'late', 'later', 'latter', 'law', 'lay', 'lead', 'leaders', 'learned', 'least', 'leave', 'led', 'left', 'length', 'less', 'let', 'letter', 'letters', 'level', 'life', 'light', 'like', 'likely', 'line', 'lines', 'list', 'literature', 'little', 'live', 'lived', 'living', 'local', 'long', 'longer', 'look', 'looked', 'looking', 'lost', 'lot', 'love', 'low', 'lower', 'm', 'made', 'main', 'major', 'make', 'makes', 'making', 'man', 'manner', 'mans', 'many', 'march', 'market', 'married', 'mass', 'material', 'matter', 'may', 'maybe', 'me', 'mean', 'meaning', 'means', 'medical', 'meet', 'meeting', 'member', 'members', 'men', 'merely', 'met', 'method', 'methods', 'middle', 'might', 'miles', 'military', 'million', 'mind', 'minutes', 'miss', 'modern', 'moment', 'money', 'month', 'months', 'moral', 'more', 'morning', 'most', 'mother', 'move', 'moved', 'movement', 'moving', 'mr', 'mrs', 'much', 'music', 'must', 'my', 'myself', 'n', 'name', 'nation', 'national', 'nations', 'natural', 'nature', 'near', 'nearly', 'necessary', 'need', 'needed', 'needs', 'negro', 'neither', 'never', 'new', 'next', 'night', 'no', 'non', 'nor', 'normal', 'north', 'not', 'note', 'nothing', 'now', 'nuclear', 'number', 'numbers', 'obtained', 'obviously', 'of', 'off', 'office', 'often', 'oh', 'old', 'on', 'once', 'one', 'ones', 'only', 'open', 'opened', 'operation', 'opportunity', 'or', 'order', 'organization', 'other', 'others', 'our', 'out', 'outside', 'over', 'own', 'p', 'paid', 'paper', 'part', 'particular', 'particularly', 'parts', 'party', 'passed', 'past', 'pattern', 'pay', 'peace', 'people', 'per', 'performance', 'perhaps', 'period', 'person', 'personal', 'persons', 'physical', 'picture', 'piece', 'place', 'placed', 'plan', 'plane', 'planning', 'plans', 'plant', 'play', 'point', 'points', 'police', 'policy', 'political', 'pool', 'poor', 'population', 'position', 'possible', 'post', 'power', 'present', 'president', 'press', 'pressure', 'price', 'principle', 'private', 'probably', 'problem', 'problems', 'process', 'production', 'products', 'program', 'programs', 'progress', 'property', 'provide', 'provided', 'public', 'purpose', 'put', 'quality', 'question', 'questions', 'quite', 'r', 'race', 'radio', 'ran', 'range', 'rate', 'rather', 'reached', 'reaction', 'read', 'reading', 'ready', 'real', 'really', 'reason', 'received', 'recent', 'recently', 'record', 'red', 'religion', 'religious', 'remember', 'report', 'reported', 'required', 'research', 'respect', 'responsibility', 'rest', 'result', 'results', 'return', 'returned', 'right', 'river', 'road', 'room', 'run', 'running', 's', 'said', 'sales', 'same', 'sat', 'saw', 'say', 'saying', 'says', 'school', 'schools', 'science', 'season', 'second', 'secretary', 'section', 'see', 'seem', 'seemed', 'seems', 'seen', 'self', 'sense', 'sent', 'series', 'serious', 'served', 'service', 'services', 'set', 'seven', 'several', 'shall', 'she', 'short', 'shot', 'should', 'show', 'showed', 'shown', 'side', 'similar', 'simple', 'simply', 'since', 'single', 'situation', 'six', 'size', 'slowly', 'small', 'so', 'social', 'society', 'some', 'something', 'sometimes', 'somewhat', 'son', 'soon', 'sort', 'sound', 'south', 'southern', 'soviet', 'space', 'speak', 'special', 'specific', 'spirit', 'spring', 'square', 'st', 'staff', 'stage', 'stand', 'standard', 'start', 'started', 'state', 'statements', 'states', 'stay', 'step', 'steps', 'still', 'stock', 'stood', 'stop', 'stopped', 'story', 'straight', 'street', 'strength', 'strong', 'student', 'students', 'study', 'subject', 'such', 'suddenly', 'summer', 'sun', 'support', 'sure', 'surface', 'system', 'systems', 't', 'table', 'take', 'taken', 'taking', 'talk', 'tax', 'technical', 'tell', 'temperature', 'ten', 'term', 'terms', 'test', 'th', 'than', 'that', 'thats', 'the', 'their', 'them', 'themselves', 'then', 'theory', 'there', 'therefore', 'theres', 'these', 'they', 'thing', 'things', 'think', 'thinking', 'third', 'thirty', 'this', 'those', 'thought', 'three', 'through', 'through', 'throughout', 'thus', 'time', 'times', 'to', 'today', 'together', 'told', 'too', 'took', 'top', 'total', 'toward', 'town', 'trade', 'training', 'treatment', 'trial', 'tried', 'trouble', 'true', 'truth', 'try', 'trying', 'turn', 'turned', 'twenty', 'two', 'type', 'types', 'u', 'under', 'understand', 'understanding', 'union', 'united', 'university', 'until', 'up', 'upon', 'us', 'use', 'used', 'using', 'usually', 'value', 'values', 'various', 'very', 'view', 'voice', 'volume', 'waiting', 'walked', 'wall', 'want', 'wanted', 'war', 'was', 'washington', 'wasnt', 'water', 'way', 'ways', 'we', 'week', 'weeks', 'well', 'went', 'were', 'west', 'western', 'what', 'whatever', 'when', 'where', 'whether', 'which', 'while', 'white', 'who', 'whole', 'whom', 'whose', 'why', 'wide', 'wife', 'will', 'william', 'window', 'wish', 'with', 'within', 'without', 'woman', 'women', 'word', 'words', 'work', 'worked', 'working', 'works', 'world', 'would', 'wouldnt', 'writing', 'written', 'wrong', 'wrote', 'year', 'years', 'yes', 'yet', 'york', 'you', 'young', 'your', 'youre'];	
	out += thousand;
	
	if (source === 'reddit') out += ['permalinkparentreportreply', 'reddit', 'goldreply', 'comments', 'load', 'permalinkparentreportgive', 'rgood', 'permalinkreportgive', 'edit', 'thread', 'inbox', 'klib', 'deleted'];		
	
	out += ['http']; //system words
	
	return out;
}

// lang:popup_dclick
dbcpopup = function() {
	
	var selection = window.getSelection().toString();	
	console.log(selection.toString());
	
	// var popup = document.createElement('div');	
	// popup.setAttribute("id", "dbcpopup");
	// popup.innerText = selection.toString();
}


get_words();
document.body.addEventListener('dblclick', dbcpopup);


// --
