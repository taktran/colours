(function (){
  'use strict';

  $(".player input[type=range]").change(function(data) {
    var el = $(data.target),
      val = el.val(),
      playerNum = el.parent().data("player-num");

    console.log(playerNum, val);
  });

})();