var decisionTree,age,sex,skelly_location;
var path = [];

// get JSON dynamically (only works on web server, not locally!)
$.getJSON( "json/decisiontrees_7.json", function( data ) {
	decisionTree = data;
});

// button clicks in general
function buttonify(){
	$('button').click(function(){
		$(this).parent().children().each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
}
buttonify();

// start button clicks 
$('#start button').click(function(){
    age = $('#age-btns .active');
    sex = $('#sex-btns .active');
    if(age.length && sex.length){
		$('#start').fadeOut(500, function(){
			$('#questions').fadeIn(500);
		});
		$('#bio').removeClass('active');
		$('#symptoms').addClass('active');
	}
});

// skelly clicks
$('area').click(function(){
    skelly_location = $(this).attr('href').replace('#','');
    if(age && sex){
		
		$('#options').html(''); // empty options
		
		question = Object.keys(decisionTree[skelly_location])[0];
		$('#options').append('<h3>'+question+'</h3>');
		path.push(question);
		
		answers = decisionTree[skelly_location][question];
		console.log(answers);
		for (var i in answers) {
			button = '<button data:key="'+i+'">'+i+'</button>';
			$('#options').append(button);
		}
		buttonify();
		answerClicky();
	}
});

// answer clicks
function answerClicky(){
	$('#options button').click(function(){
		console.log('asdf');
	});
}


