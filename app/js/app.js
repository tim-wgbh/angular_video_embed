'use strict';

// Declare app level module which depends on views, and components
var videoEmbedApp = angular.module('videoEmbedApp', [
  'videoEmbedApp.version',
  'ccFilters'
]);

videoEmbedApp.controller('PlayerCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.playerId = 'jw_player';
    $scope.setCC = function(key = null, value = null, $event = null) {
      var captions = $scope.options.captions
      if (key && value) {
        if (key == 'fontSize') {
          captions[key] = parseInt(captions[key]) + value;
        } else {
          captions[key] = value;
        }
      }
      $scope.textStyle = {'font-size': captions.fontSize + "px", 'color': captions.color, 'background-color': convertHex(captions.backgroundColor, captions.backgroundOpacity) };
      $scope.windowStyle = {'background-color': convertHex(captions.windowColor, captions.windowOpacity) };
      if ($event) {
        angular.element($event.target).parent().parent().find('img').removeClass('selected');
        angular.element($event.target).addClass('selected');
      }      
    };
    
    $scope.toggleCC = function($event) {
      angular.element($event.target).find('#ccSettings').toggleClass('hidden');
    }
    
    $scope.applySettings = function(options) {
      var playPosition = $scope.thePlayer.getPosition();
      options.autostart = true;
      var thePlayer = jwplayer($scope.PlayerId).setup(options);
      thePlayer.play(true);
      thePlayer.seek(playPosition);
    };
    
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
        sources: [{
          file: 'http://d38iwtzje88pzt.cloudfront.net/livehls/ngrp:Cube1_all/playlist.m3u8'
        }]
      }
    ];
    $scope.options.captions = {
      color: "#ff0000",
      fontOpacity: '100',
      fontSize: '15',
      backgroundColor: "#ffffff",
      backgroundOpacity: '75',
      windowColor: "transparent",
      windowOpacity: "0"
    };
    
    $scope.thePlayer = jwplayer($scope.playerId).setup($scope.options);
    
    $scope.textStyle = $scope.setCC();
    $scope.windowStyle = $scope.setCC();
    
    $scope.urlParams = $location.search();


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
  }]
);

function convertHex(hex,opacity){
  hex = hex.replace('#','');
  var r = parseInt(hex.substring(0,2), 16);
  var g = parseInt(hex.substring(2,4), 16);
  var b = parseInt(hex.substring(4,6), 16);

  return 'rgba( ' +r + ',' + g + ',' + b + ',' + opacity/100 + ')';
}

