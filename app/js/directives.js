angular.module('playerDirectives', []).directive('apply-settings',
  function() {
    return {
      scope: {
        'ccSettings': '='
      },
      restrict: 'A',
      link: function( scope, element, attrs ) {
        console.log(element)
          element.on('click', function() {
            console.log(scope.ccSettings);
            var id = scope.playerId ||'jw_player';
            var thePlayer = jwplayer(id);
            var playPosition = thePlayer.getPosition();
            options.autostart = true
            thePlayer.setup(scope.ccSettings);
            thePlayer.play(true);
            thePlayer.seek(playPosition);
          });
        }
    }
  }
);
