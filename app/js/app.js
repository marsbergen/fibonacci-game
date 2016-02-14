import angular from 'angular';

import AppController from './controllers/AppController.js';
import colorHighlight from './directives/colorHighlight.js';

angular.module('gameApp', [])
  .controller('appController', AppController)
  .directive('colorHighlight', colorHighlight);
