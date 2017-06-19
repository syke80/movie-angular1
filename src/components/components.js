import angular from 'angular';

import movieListComponent from './movieList/movieList.component';
import movieItemComponent from './movieItem/movieItem.component';
import movieSearchComponent from './movieSearch/movieSearch.component';

export default angular.module('app.components', [])
  .component('movieSearch', movieSearchComponent)
  .component('movieItem', movieItemComponent)
  .component('movieList', movieListComponent);
