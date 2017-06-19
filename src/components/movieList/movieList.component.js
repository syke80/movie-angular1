import template from './movieList.html';
import controller from './movieList.controller.js';
import './movieList.scss';

export default {
    bindings: {
        movies: '<',
    },
    template,
    controller
}
