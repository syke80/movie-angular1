import angular from 'angular';
import AppComponent from './app.component';
import components from './components/components';
import services from './services/services';

angular.module('app', [
    components.name,
    services.name
])
.component('app', AppComponent);

angular.bootstrap(document.body, ['app'])
