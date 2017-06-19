import angular from 'angular';

import configService from './config.service';
import movieService from './movie.service';

export default angular
  .module('app.services', [])
  .service({
      configService,
      movieService
  });
