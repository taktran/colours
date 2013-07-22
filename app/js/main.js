(function (){
  'use strict';

  var NUM_PLAYERS = 2,
    GOAL_THRESHOLD = 5,
    SENSOR_MIN = 0,
    SENSOR_MAX = 1023,
    INPUT_MIN = 100,
    INPUT_MAX = 255,
    goal,
    isDone = false;

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

    $(".done").click(function() {
      reset();
      $(this).hide();
      isDone = false;
    });

    // Socket.io
    var socket = io.connect("/", {
      "reconnect" : true,
      "reconnection delay" : 500,
      "max reconnection attempts" : 10
    });

    socket.on("connect", function() {
      socket.emit("message", "Connected - " + (new Date()).toString());
    });

    socket.on("sensor1", function(value) {
      if (!isDone) {
        var mappedValue = mapSensorValue(value);
        console.log("1:", value, mappedValue);
        player1El.val(mappedValue);
        updateColours();
      }
    });

    socket.on("sensor2", function(value) {
      if (!isDone) {
        var mappedValue = mapSensorValue(value);
        console.log("2:", value, mappedValue);
        player2El.val(mappedValue);
        updateColours();
      }
    });
  }

  function reset() {
    init();
  }

  function mapSensorValue(value) {
    var valueProportion = value / (SENSOR_MAX - SENSOR_MIN),
      valueMap = Math.floor(
        (valueProportion * (INPUT_MAX - INPUT_MIN)) + INPUT_MIN
      );

    return valueMap;
  }

  function goalCompletedEvent() {
    isDone = true;

    console.log("Goal complete");
    $(".container")
      .hide()
      .fadeIn(500, function() {
        $(".done").show();
      });

  }

  function random(min, max) {
    var minInt = parseInt(min, 10),
      maxInt = parseInt(max, 10);

    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  }

  function randomGoal(min, max) {
    var goalEl = $(".combined .goal"),
      randomVal1 = random(min, max),
      randomVal2 = random(min, max),
      goalRGB;

    goal = { r: randomVal1, g: 0, b: randomVal2 };

    if (goalComplete()) {
      console.log("Goal done too early, getting another goal");
      randomGoal(min, max);
    } else {
      goalRGB = rgbCSS(goal);
      goalEl.css("background-color", goalRGB);
    }
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

  function goalComplete() {
    var player1Colour = parseInt($(".player-1 input").val(), 10),
      player2Colour = parseInt($(".player-2 input").val(), 10);

    console.log(player1Colour, player2Colour, goal);

    return (Math.abs(player1Colour - goal.r) <= GOAL_THRESHOLD) &&
      (Math.abs(0 - goal.g) <= GOAL_THRESHOLD) &&
      (Math.abs(player2Colour - goal.b) <= GOAL_THRESHOLD);

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
    }

    if (goalComplete()) {
      goalCompletedEvent();
    }
  }

  init();

})();