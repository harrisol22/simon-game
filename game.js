

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var userClicks = 0;

// start the game
$(document).on("keydown", function(){
  if (!started) {
    level++;
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
  started = true;
});

// stuff to do when the user clicks a button
$(".btn").click(function() {
  if (started) {
    var userChosenColor = $(this).attr("id"); // gets the id of the "this" that was clicked
    // add the clicked button to the userClickedPattern array
    userClickedPattern.push(userChosenColor);

    if (userChosenColor === gamePattern[userClicks]){
      playSound(userChosenColor);
      animatePress(userChosenColor);
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over. Press a key to try again.");
      startOver();
    }

  }
    userClicks++;
    if (userClicks === gamePattern.length) {
      level++;
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
      userClicks = 0;
      }
  });

function nextSequence() {
  // choose a random color
  var buttonColors = ["red", "blue", "green", "yellow"];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  // add a random color to the sequence
  gamePattern.push(randomChosenColor);
  $("h1").text("Level " + level);

  setTimeout(function() {
    // make that color button flash
    animatePress(randomChosenColor);
    // play the associated sound
    playSound(randomChosenColor);
  }, 200);
}

// this function gets the sound associated with the given name and plays it
function playSound(name) {
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}

// this function adds the pressed class to the #currentColor id, waits 100ms, then removes the pressed class
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
