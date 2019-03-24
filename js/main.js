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
		for (var i in answers) {
			button = '<button>'+i+'</button>';
			$('#options').append(button);
		}
		buttonify();
		answerClicky();
	}
});

// function to transform description to ul/li
function listify(input){
	output = input.replace(/~/g,'<li>').replace(/<br\/>/g,'</li>');
	output = '<ul>'+output+'</li></ul>';
	return output;
}

// answer clicks
function answerClicky(){
	$('#options button').click(function(){
		$('#options').html(''); // empty options
		
		answer = $(this).html();
		path.push(answer);
		
		tempTree = decisionTree[skelly_location];
		path.forEach(function(element) { // this goes through the path to the next question
			tempTree = tempTree[element]; 
		});
		
		question = Object.keys(tempTree)[0];
		if(question == 'diagnosis'){ // end of tree reached, display diagnosis
			$('#symptoms').removeClass('active');
			$('#conditions').addClass('active');
			$('#questions').html('<h2>Most likely differential diagnosis is:</h2><div class="diagnosis">'+tempTree['diagnosis']+'</div><div class="description">'+listify(tempTree['description'])+'</div><button class="reset-btn" onclick="location.reload();">Reset Symptom Checker</button> '); 
		}
		else {
			$('#options').append('<h3>'+question+'</h3>');
			path.push(question);
			
			answers = tempTree[question];
			for (var i in answers) {
				button = '<button>'+i+'</button>';
				$('#options').append(button);
			}
			buttonify();
			answerClicky();
			
		}
	});
}

// popups
$('#contact-link').click(function(e){
	e.preventDefault();
	$( "#contact" ).dialog({
		modal: true // Freeze the background behind the overlay
	});
});
$('#additional-link').click(function(e){
	e.preventDefault();
	$( "#additional" ).dialog({
		modal: true // Freeze the background behind the overlay
	});
});

