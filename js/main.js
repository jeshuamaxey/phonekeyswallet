var pkw = {};

$(document).ready(function() {
	impress().init();

	//add event listeners that will cue movements through the app
	/*
	$('.btn-info.male').click(startMale);
	$('.btn-info.female').click(startFemale);

	$('.btn-success').click(yesClick);
	$('.btn-danger').click(noClick);
	*/
	$('.btn').click(overlord);
});

function overlord() {
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

$('.intermediate').bind('impress:stepenter', function() {
	if($(this).attr('postIntermediate')) {
		//update the postIntermediate value if it exisits
		//one should exisit only for an extended chain of
		//intermediate steps
		pkw.postIntermediate = $(this).attr('postIntermediate');
	}
	console.log('intermediate entered. postIntermediate = '+ pkw.postIntermediate);
	impress().goto(pkw.postIntermediate);
})