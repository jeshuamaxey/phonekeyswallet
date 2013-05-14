var pkw = {
	terminalprompt: '-bash-3.2$ '
};

$(document).ready(function() {
	impress().init();
	/*
	* master event listener - this guides the
	* majority of navigation through the app
	*/
	$('.btn').click(buttonClickYes);
	/*
	* flashes up a warning if the item
	* is not in possession
	*/
	$('.btn-danger').click(buttonClickNo);
	$('#closeWarning').click(closeWarning);
	/*
	* cute trick which sets name of correct
	* gender on last step of the app
	*/
	$('.btn-info').click(setGender);
	/*
	* blink the cursor in the terminal
	*/
	window.setInterval(function() {
		$('.blinking').toggle();
	}, 400);
	/*
	*
	*/
	window.setInterval(function() {
		if(!$('#terminal').hasClass('hidden')) {
			enableTerminal();
		} else {
			resetTerminal();
		}
	}, 300); //end setTimeout
});

function buttonClickYes() {
	//stopPropagation required because clicking on an element in impress.js
	//automatically makes that element's slide the focus. We want to stop
	//this so we can control the user's navigation through the flowchart
	event.stopPropagation();
	//store where to go after the intermediate slide when applicable
	//this variable will be used if the wehreNext attribute of a
	//step points to an intermediate step
	pkw.postIntermediate = $(this).attr('postIntermediate') || '';
	//store where to go next
	pkw.nextQ = $(this).attr('whereNext');
	//console.log(pkw);
	impress().goto(pkw.nextQ);
}

function buttonClickNo() {
	//store missing item
	pkw.missing = $(this).attr('missing');
	console.log('missing:' + pkw.missing);
	$('#warning #item').html(pkw.missing);	
	//$('#warning').fadeIn();
	$('#terminal').slideDown(1000, function() {
		$(this).removeClass('hidden');
	});
	$('.present').fadeOut();
}

function closeWarning() {
	$('#terminal').fadeOut(400, function() {
		$(this).addClass('hidden');
	});
	//$('#warning').fadeOut();
	$('.present').fadeIn();
}

$('.intermediate').bind('impress:stepenter', function() {
	if($(this).attr('postIntermediate')) {
		//update the postIntermediate value if it exisits
		//one should exisit only for an extended chain of
		//intermediate steps
		pkw.postIntermediate = $(this).attr('postIntermediate');
	}
	console.log('intermediate entered. postIntermediate = '+ pkw.postIntermediate);
	impress().goto(pkw.postIntermediate);
});

function setGender() {
	console.log(99);
	var gender = $(this).html();
	console.log(gender);
	if(gender == 'Male') {
		$('#isFemale').hide();
	} else if(gender == 'Female') {
		$('#isMale').hide();
	}
}

function enableTerminal() {
	console.log('terminal enabled');

	document.body.onkeydown = function(e){
		e = e || window.event;
		switch(e.keyCode) {
			case 13: //enter key
				console.log('hit enter');
				runCommand($('.current-line').html().substring(pkw.terminalprompt.length,$('.current-line').html().length));
				newLine();
				break;
			case 8: //backspace
				console.log('hit backspace');
				//stop the browser navigating back
				e.preventDefault();
				//awesome jQuery work to delete last char BOOM!
				if($('.current-line').html().length > pkw.terminalprompt.length) {
					$('.current-line').html($('.current-line').html().substring(0, $('.current-line').html().length - 1));
				}
				break;
			//case 32: //spacebar
			case 37:
			case 38:
			case 39:
			case 40:
				//arrow keys
				break;
			default:
				//add new char before the cursor
				$('.current-line').append(String.fromCharCode(e.keyCode));
				break;
		}
		
	};

}

function newLine() {
	$('.current-line').removeClass('current-line');
	$('.blinking').removeClass('blinking');
	$('#terminal li:last').after('<li class="line"><span class="line-content current-line">'+pkw.terminalprompt+'</span><span class="cursor blinking"></span></li>')
}

function runCommand(command) {
	console.log(command);
}
function resetTerminal() {
	console.log('terminal reset');
	document.body.onkeydown = function(e){};
}