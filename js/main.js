var pkw = {};

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
	$('#warning').show();
}

function closeWarning() {
	$('#warning').hide();
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