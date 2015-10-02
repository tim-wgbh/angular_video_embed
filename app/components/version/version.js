'use strict';

angular.module('videoEmbedApp.version', [
  'videoEmbedApp.version.interpolate-filter',
  'videoEmbedApp.version.version-directive'
])

.value('version', '0.1');
