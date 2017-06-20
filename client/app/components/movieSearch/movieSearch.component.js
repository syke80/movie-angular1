import template from './movieSearch.html';
import controller from './movieSearch.controller.js';

export default {
    bindings: {
        searchChange: '&'
    },
    template,
    controller
}
