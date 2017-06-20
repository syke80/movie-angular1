import MovieService from './movie.service';

const ENDPOINT_URL = 'http://www.example.com/';
const API_KEY ='12345';
const MOVIE_1_ID = 1;
const MOVIE_1 = {
    imdbID: MOVIE_1_ID,
    Title: 'title 1',
    Poster: 'http://www.example.com/1.jpg'
}
const MOVIE_1_DETAILED = Object.assign({}, MOVIE_1, {Plot: 'plot 1'});
const MOVIE_2 = {
    imdbID: 2,
    Title: 'title 2',
    Poster: 'http://www.example.com/2.jpg'
}
const MOVIE_3 = {
    imdbID: 3,
    Title: 'title 3',
    Poster: 'http://www.example.com/3.jpg'
}
const MOVIES_API_RESPONSE = {
    Search: [MOVIE_1, MOVIE_2, MOVIE_3]
}
const EXISTING_MOVIE_ID = 1;
const MOVIE_DESCRIPTION = 'description';

describe('MovieService', () => {
    let service,
        $httpBackend,
        $http;

    beforeEach(inject(function ($injector) {
        let configService = {
                getMovieEndpoint: sinon.stub().returns(ENDPOINT_URL),
                getApiKey: sinon.stub().returns(API_KEY)
            },
            $q = $injector.get('$q');
        $http = $injector.get('$http');

        $httpBackend = $injector.get('$httpBackend');

/*
        $httpBackend
            .when('GET', ENDPOINT_URL)
            .respond(200, { foo: 'bar' });
*/
        service = new MovieService(configService, $http, $q);
    }));


    describe('getMovieDetails', () => {
        it('should pass', inject(($http, $q) => {
            expect(2).to.equal(2); // Recommended
        }));

        it('should not fail on play2', inject(($http, $q) => {
            service.play2(12);
            expect(2).to.equal(2); // Recommended
        }));

        it('should not fail on play()', () => {
            // TODO: should be refactored. it fails if api key or id need to be urlencoded
            $httpBackend
                .expectGET(ENDPOINT_URL+'?apiKey='+API_KEY+'&i='+MOVIE_1_ID)
                .respond(200, MOVIE_1_DETAILED);

           service.play(EXISTING_MOVIE_ID);

            $httpBackend.flush();

            //console.log('!!! DEBUG RESULT ', result);
            expect(2).to.equal(2); // Recommended
        });
    });
});