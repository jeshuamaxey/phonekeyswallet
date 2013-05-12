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
	var next = $(this).attr('whereNext');
	console.log(next);
	impress().goto(next);
}

/*

function yesClick() {
	var next = $(this).attr('whereNext');
	console.log(next);
//	console.log(event);
	impress().goto(next);
}

function noClick() {
	console.log($(this).attr('whereNext'));
}

function startMale() {
	console.log('male');
}

function startFemale() {
	console.log('female');
}

*/