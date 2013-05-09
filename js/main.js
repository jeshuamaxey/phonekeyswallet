$(document).ready(function() {
	impress().init();

	//add event listeners that will cue movements through the app
	$('.btn-info.male').click(startMale);
	$('.btn-info.female').click(startFemale);

	$('.btn-success').click(yesClick);
	$('.btn-danger').click(noClick);
});

function yesClick() {
	console.log($(this).attr('whereNext'));
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