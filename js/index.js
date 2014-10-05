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
        $("main").prepend(html);
    }
    var currentQuestionIndex = parseInt($("#currentQuestion").val());
    var currentQuestion = $(".entry")[currentQuestionIndex];
    $(currentQuestion).addClass("current");
    $(currentQuestion).show();



    //TODO:select choice  

    //TODO:Ok button handler
    //TODO:next question handler
    //TODO:previous question handler
    //TODO:Update Current Question Handler

}




$(document).ready(function() {
    init();




    $(".entry").each(function() {
        var question = $(this);
        var confirmButton = $(question).find("button");
        $(confirmButton).one('click', function() {
            var button = $(this);
            var selectedAnswer =  $("#currentAnswer").val();
            var answer = $(button).parent().find('.answer').val();
            if (selectedAnswer === answer) {
                alert("correct")
            } else {
                alert("Sorry, the answer was: " + answer);
            }
            nextQuestion();
        });

        var answerListItems = $(question).find("ul.choices").find("li");
        $(answerListItems).each(function() {
            var li = $(this);
            $(li).click(function() {
                var choice = $(this);
                var currentQuestion = $(choice).parent().parent();
                var confirmButton = $(currentQuestion).find("button");
                $("#currentAnswer").val($(choice).text().trim());
                $(confirmButton).hide();
                $(confirmButton).show(); //TODO:show button          
            });
        });

    });


    var nextQuestion = function() {
        $(".entry").hide();
        var questions = $(".entry");
        var current = parseInt($("#currentQuestion").val()) //TODO:getCurrentQuestion
        var next = current + 1;
        if (next >= questions.length) {
            alert("you completed the quiz")
        } else {
            $(questions[next]).show();
            $("#currentQuestion").val(next);
            alert("The next number is: " + next);
        }
    }
});
