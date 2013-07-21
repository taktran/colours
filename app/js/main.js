(function (){
  'use strict';

  var NUM_PLAYERS = 2,
    goal;

  function init() {
    var player1El = $(".player-1 input"),
      player2El = $(".player-2 input"),
      randomInput1 = random(player1El.attr("min"), player1El.attr("max")),
      randomInput2 = random(player2El.attr("min"), player2El.attr("max"));

    $(".player-1 input").val(randomInput1);
    $(".player-2 input").val(randomInput2);

    // Random goal
    randomGoal(player1El.attr("min"), player1El.attr("max"));

    updateColours();

    $(".player input[type=range]").change(function() {
      updateColours();
    });
  }

  function random(min, max) {
    return Math.floor((Math.random() * parseInt(max, 10)) + parseInt(min, 10));
  }

  function randomGoal(min, max) {
    var goalEl = $(".combined .goal"),
      randomVal1 = random(min, max),
      randomVal2 = random(min, max),
      goalRGB;

    goal = { r: randomVal1, g: 0, b: randomVal2 };
    goalRGB = rgbCSS(goal);

    goalEl.css("background-color", goalRGB);
  }

  function rgbCSS(rgbHash) {
    return "rgb(" + rgbHash.r + ", " + rgbHash.g +", " + rgbHash.b + ")";
  }

  function combinedColour() {
    var player1Colour = $(".player-1 input").val(),
      player2Colour = $(".player-2 input").val();

    return "rgb(" + player1Colour + ", " + "0, " + player2Colour + ")";
  }

  function updateCombinedColour() {
    var combinedEl = $(".combined .current");
    combinedEl.css("background-color", combinedColour());
  }

  function goalCheck() {
    var player1Colour = $(".player-1 input").val(),
      player2Colour = $(".player-2 input").val();

    return player1Colour === goal.r &&
      0 === goal.g &&
      player2Colour === goal.b;

  }

  function updateColours() {
    for (var n = 1; n <= NUM_PLAYERS; n++) {
      var playerInputEl = $(".player-" + n + " input"),
        playerInput = playerInputEl.val(),
        playerEl = $(".player-" + n),
        playerColour;

      if (n === 1) {
        playerColour = "rgb(" + playerInput + ", 0, 0)";
      } else if (n === 2) {
        playerColour = "rgb(0, 0, " + playerInput + ")";
      }

      playerEl.css("background-color", playerColour);
      updateCombinedColour();

      console.log("update", n, playerInput, playerColour, goal, goalCheck());
    }
  }

  init();

})();