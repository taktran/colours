(function (){
  'use strict';

  var RGB_MAX = 255,
    NUM_PLAYERS = 2;

  function init() {
    var randomVal1 = Math.floor((Math.random() * 255)),
      randomVal2 = Math.floor((Math.random() * 255));

    $(".player-1 input").val(randomVal1);
    $(".player-2 input").val(randomVal2);

    updateColours();

    $(".player input[type=range]").change(function(data) {
      var el = $(data.target),
        val = el.val(),
        playerNum = el.parent().data("player-num");

      console.log("range change", playerNum, val, combinedColour());

      updateColours();
    });
  }

  function combinedColour() {
    var player1Colour = $(".player-1 input").val(),
      player2Colour = $(".player-2 input").val();

    return (player1Colour + player2Colour) % RGB_MAX;
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
      console.log("update", n, playerInput, playerColour);
    }
  }

  init();

})();