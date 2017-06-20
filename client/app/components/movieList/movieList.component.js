import template from './movieList.html';
import controller from './movieList.controller.js';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import './movieList.scss';

export default {
    bindings: {
        movies: '<',
    },
    template,
    controller
}
