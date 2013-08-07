window.oldItem = null;

function show_input() {
	
	var voicev = document.getElementById("voice").style.visibility;
	
	if (voicev != "visible") voicev = "visible";
	else voicev = "hidden"
}

function touch_pdiv(item) {
			
	var curHeight = $(item).height();
	
	if (curHeight != 150) {
		// $(item).height(curHeight).animate({height: 150, queue: false}, 500);
		return;
	}	
	
	// if (window.oldItem != null)
		// $(window.oldItem).height($(window.oldItem).height()).animate({height: 150}, 500);
		

	window.oldItem = item; 
	$(item).css('height', 'auto');
	var autoHeight = $(item).height();
	$(item).height(curHeight).animate({height: autoHeight, queue: false}, 500);
	
	// $(this).stop(true);
	// $('body').scrollTo($(item), 700);
	// $('#'+item.id).offset().top
	console.log($('#'+item.id).offset().top);
	$('html, body').animate({scrollTop: $('#'+item.id).offset().top-50}, 500);
}

// function close_div(item) {
// 	
// 
// }

// function open_f() {
// 	var curHeight = $('#actions').height();
// 	$('#actions').css('height', 'auto');
// 	var autoHeight = $('#actions').height();
// 	$('#actions').height(curHeight).animate({height: autoHeight, queue: false}, 1000);		
// 	window.oldItem = $('#actions');
// 	
// 	// $('html, body').animate({scrollTop: $('#actions').offset().top-150}, 500);
// }