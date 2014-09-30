(function () {
  'use strict';
}());


var createQuestion = function (question) {
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


$(document).ready(function () {

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
    $("main").append(html);
  }

  $(".entry").each(function(item){
  	$(item).hide();
  });



});
