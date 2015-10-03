'use strict';

// Declare app level module which depends on views, and components
var videoEmbedApp = angular.module('videoEmbedApp', [
  'videoEmbedApp.version',
  'ccFilters'
]);

videoEmbedApp.controller('PlayerCtrl', ['$scope', '$location',
  function($scope, $location) {
  
    // Player ID
    $scope.playerId = 'jw_player';
    
    // Get the URL playback parameters
    $scope.urlParams = $location.search();
    
    if (typeof $scope.urlParams.video_file == 'undefined') {
      var sourceFile = 'http://d38iwtzje88pzt.cloudfront.net/livehls/ngrp:Cube1_all/playlist.m3u8';
      var posterImage = 'images/default_poster.gif';
      $scope.liveStream = true;
    } else {
      var sourceFile = $scope.urlParams.video_file;
      if (typeof $scope.urlParams.poster == 'undefined') {
        posterImage = 'images/default_poster.gif';
      } else {
        posterImage = $scope.urlParams.poster;
      }
      $scope.liveStream = $scope.urlParams.livestream ? true : false;
    }

   // Function declarations
    $scope.setCC = function(key = null, value = null, $event = null) {
      var captions = $scope.options.captions
      if (key && value) {
        if (key == 'fontSize') {
          captions[key] = (parseInt(captions[key]) + value) +"px";
        } else {
          captions[key] = value;
        }
      }
      $scope.textStyle = {'font-size': captions.fontSize + "px", 'color': captions.color, 'background-color': convertHex(captions.backgroundColor, captions.backgroundOpacity) };
      $scope.windowStyle = {'background-color': convertHex(captions.windowColor, captions.windowOpacity) };
      if ($event) {
        jQuery($event.target).parent().parent().find('img').removeClass('selected');
        jQuery($event.target).addClass('selected');
      }      
    };
    
    $scope.toggleModal = function() {
      jQuery('.modal').css({ height: jQuery(window).height() + "px" });
      jQuery('.modal, #ccSettings').fadeToggle();
    }
    
    $scope.applySettings = function(options) {
      $scope.toggleModal();
      if (!$scope.liveStream) {
        var playPosition = $scope.thePlayer.getPosition();
      }
      options.autostart = true;
      var thePlayer = jwplayer($scope.playerId).setup(options);
      if (playPosition) {
        thePlayer.seek(playPosition);
      }
      thePlayer.play(true);
    };
    
    // Initialize player options
    $scope.options = $scope.options || {};
    $scope.options.width = '100%';
    $scope.options.aspectratio = '16:9';
    $scope.options.primary = 'flash';
    $scope.options.logo = {
      file: 'images/WGBH_White.png',
      hide: true,
      margin: 12
    };
    $scope.options.playlist = [
      {
        image: posterImage,
        sources: [{
          file: sourceFile,
        }]
      }
    ];
    $scope.options.captions = {
      color: "#ffffff",
      fontOpacity: '100',
      fontSize: '15px',
      backgroundColor: "#000000",
      backgroundOpacity: '75',
      windowColor: "transparent",
      windowOpacity: "0"
    };
    
    // Instantiate the player
    $scope.thePlayer = jwplayer($scope.playerId).setup($scope.options);
    
    // Save the caption styles
    $scope.textStyle = $scope.setCC();
    $scope.windowStyle = $scope.setCC();
    

    /** CC options **/
    $scope.font = {
      'size': '-4',
      'color': 'white',
      'opacity' : '100'
    }
    $scope.background = {
        'color': 'black',
        'opacity': '75'
    }
    $scope.window = {
      'color': 'transparent',
      'opacity': '0'
    }
    $scope.sizeOptions = [
      {
        'size': -4,
        'label': '\u2193 smaller',
        'image': 'smaller.png'
      },
      {
        'size': 4,
        'label': '\u2191 LARGER',
        'image': 'larger.png'
      }
    ];
    $scope.colorOptions =  [
      {
        'color':'white',
        'hex' : '#ffffff',
        'image' : 'white.png'
      }, 
      {
        'color':'black',
        'hex' : '#000000',
        'image' : 'black.png'
      }, 
      {
        'color':'yellow',
        'hex' : '#ffff00',
        'image' : 'yellow.png'
      }, 
      {
        'color':'red',
        'hex' : '#ff0000',
        'image' : 'red.png'
      }, 
      {
        'color':'blue',
        'hex' : '#0000ff',
        'image' : 'blue.png'
      }, 
      {
        'color':'green',
        'hex' : '#00ff00',
        'image' : 'green.png'
      }, 
      {
        'color':'magenta',
        'hex' : '#ff00ff',
        'image' : 'magenta.png'
      },
      {
        'color':'transparent',
        'hex' : 'none',
        'image' : 'none.png'
      }
    ];
  
    $scope.opacityOptions = ['100','75','50','25','0'];   
     
    // Set escape key to hide modal
    jQuery(document).keyup(function(e) {
      if ( e.keyCode == 27 ) {
        jQuery('.modal, #ccSettings').fadeOut();
      }
    });
  }]  
);

function convertHex(hex,opacity){
  hex = hex.replace('#','');
  var r = parseInt(hex.substring(0,2), 16);
  var g = parseInt(hex.substring(2,4), 16);
  var b = parseInt(hex.substring(4,6), 16);

  return 'rgba( ' +r + ',' + g + ',' + b + ',' + opacity/100 + ')';
}

