(function (){
  'use strict';

  var NUM_PLAYERS = 2;

  function init() {
    var player1El = $(".player-1 input"),
      player2El = $(".player-2 input"),
      randomInput1 = random(player1El.attr("min"), player1El.attr("max")),
      randomInput2 = random(player2El.attr("min"), player2El.attr("max")),
      goalEl = $(".combined .goal");

    $(".player-1 input").val(randomInput1);
    $(".player-2 input").val(randomInput2);

    // Random goal
    goalEl.css("background-color", randomRGB(player1El.attr("min"), player1El.attr("max")));

    updateColours();

    $(".player input[type=range]").change(function() {
      updateColours();
    });
  }

  function random(min, max) {
    return Math.floor((Math.random() * parseInt(max, 10)) + parseInt(min, 10));
  }

  function randomRGB(min, max) {
    var randomVal1 = random(min, max),
      randomVal2 = random(min, max);

    return "rgb(" + randomVal1 + ", 0, " + randomVal2 + ")";
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

      console.log("update", n, playerInput, playerColour);
    }
  }

  init();

})();