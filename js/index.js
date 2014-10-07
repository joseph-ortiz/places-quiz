(function() {
    'use strict';
}());


var createQuestion = function(question) {
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
        text: question.text,
        choices: question.choices,
        answer: question.answer
    }
    var html = template(context);
    return html;
};



var init = function() {
    var questions = [{
        text: "Which country has won the most Olympic Medals overall?",
        choices: ["United States", "Russia", "Germany", "Great Britain"],
        answer: "United States"

    }, {
        text: "The kendama is a traditional ball and cup toy originating from what asian country?",
        choices: ["China", "Japan", "Korea", "Taiwan"],
        answer: "Japan"
    }, {
        text: "The smallest country in the world is ...",
        choices: ["Monaco", "Nauru", "San Marino", "Vatican City"],
        answer: "Vatican City"
    }, {
        text: "What country is the most densley populated?",
        choices: ["Singapore", "Monaco", "Bangladesh", "Malta"],
        answer: "Bangladesh"
    }, {
        text: "What country has the most cars?",
        choices: ["Japan", "Germany", "United States", "Australia"],
        answer: "United States"
    }];


    for (var i = 0; i < questions.length; i++) {
        var html = createQuestion(questions[i]);
        $("#question-area").prepend(html);
    }
    var currentQuestionIndex = parseInt($("#currentQuestion").val());
    var currentQuestion = $(".entry")[currentQuestionIndex];
    $(currentQuestion).addClass("current");
    $(currentQuestion).show();
    hideResultImages(); //hide result images on start up.
    setupQuestions();
     $("button.reset").hide();
}

var hideResultImages = function() {
    $(".result").find("img").hide();
}
var isCorrect = function() {
    hideResultImages();
    $(".result").find("img.correct").show();
    $(".result").find("img.correct").addClass('animated bounceIn'); //addClass('animated bounceOutLeft');

}
var isWrong = function() {
    hideResultImages();
    $(".result").find("img.wrong").show();
}

var nextQuestion = function() {
    $(".next-question").click(function() {
        $(".next-question").hide();
        $(".entry").hide();
        $("img.correct").hide();
        var questions = $(".entry");
        var current = parseInt($("#currentQuestion").val()) //TODO:getCurrentQuestion
        var next = current + 1;
        if (next >= questions.length) {
            hideResultImages();
            $("button.reset").show();
        } else {
            $(questions[next]).show();
            $("#currentQuestion").val(next);
        }
    });
}


var setupQuestionHandler = function(){
  $(".entry").each(function() {
        var question = $(this);
        var confirmButton = $(question).find("button");
        $(confirmButton).one('click', function() {
            var button = $(this);
            var selectedAnswer = $("#currentAnswer").val();
            var answer = $(button).parent().find('.answer').val();
            if (selectedAnswer === answer) {
                isCorrect();
            } else {
                isWrong();
            }
            $(".next-question").show();
            nextQuestion();
        });

        var answerListItems = $(question).find("ul.choices").find("li");
        $(answerListItems).each(function() {
            var li = $(this);
            $(li).click(function() {
                var choice = $(this);
                $(choice).siblings().removeClass("clicked");
                $(choice).addClass("clicked");
                var currentQuestion = $(choice).parent().parent();
                var confirmButton = $(currentQuestion).find("button");
                $("#currentAnswer").val($(choice).text().trim());
                $(confirmButton).hide();
                $(confirmButton).show(); //TODO:show button          
            });
        });
    });
}
var setupQuestions = function() {
    
  setupQuestionHandler();
  reset();
}

var reset = function() {
    $("button.reset").click(function() {
        $("#currentQuestion").val(0);
        $($(".entry")[0]).show();
         $("button.reset").hide();  
            setupQuestionHandler();    
    });


}

$(document).ready(function() {
    init();

});
