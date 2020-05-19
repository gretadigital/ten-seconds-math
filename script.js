$(document).ready(function () {
  var currentQuestion;
  var timeLeft = 10;
  var score = 0;
  var interval;
  var rangeValue;

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function () {
    var numberRange = document.getElementById('number-range');
    var displayRange = document.getElementById('display-range');
    displayRange.innerHTML = numberRange.value;

    numberRange.oninput = function () {
      displayRange.innerHTML = this.value;
    };

    rangeValue = parseInt($('#number-range').val());

    $(document).on('input', '#number-range', function () {
      rangeValue = $(this).val();
    });

    console.log(rangeValue);
    var question = {};
    var num1 = randomNumberGenerator(rangeValue);
    var num2 = randomNumberGenerator(rangeValue);
    question.answer = num1 + num2;
    question.equation = String(num1) + ' + ' + String(num2);

    return question;
  };

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  };

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
    if (timeLeft > 3) {
      $('#time-left').css('color', 'green');
    }
  };

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $('#user-input').on('keyup', function () {
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
        if (timeLeft <= 3) {
          $('#time-left').css('color', 'red');
        }
      }, 1000);
    }
  };

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  function randomRGB() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  var title = $('#title');
  var titleColors = setInterval(function () {
    for (var letters of title) {
      letters.style.color = randomRGB();
    }
  }, 1000);

  renderNewQuestion();
});
