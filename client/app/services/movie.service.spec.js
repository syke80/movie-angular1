import MovieService from './movie.service';
import MovieModel from '../models/movie.model';

const ENDPOINT_URL = 'http://www.example.com/';
const API_KEY = '12345';
const MOVIE_ID = 1;
const MOVIE_DETAILS_RESPONSE = {
    imdbID: MOVIE_ID,
    Title: 'title 1',
    Poster: 'http://www.example.com/1.jpg',
    Plot: 'plot 1'
}
const RESPONSE_BODY_ON_API_ERROR = {msg: 'error'};
const MOVIE_NOT_FOUND_RESPONSE = {
    Response: 'False',
    Error: 'Incorrect IMDb ID.'
}
const TOO_SHORT_SEARCH_STRING = 'qw';
const SEARCH_STRING = 'qwe';
const INVALID_MOVIE_LIST_RESPONSE = {
    invalidKey: 'invalid key'
}
const MOVIE_LIST_RESPONSE = {
    Search: [
        {
            imdbID: 1,
            Title: 'title 1',
            Poster: 'http://www.example.com/1.jpg'
        },
        {
            imdbID: 2,
            Title: 'title 2',
            Poster: 'http://www.example.com/2.jpg'
        }
    ]
}
const MOVIE_LIST_EMPTY_RESPONSE = {
    Response: 'False',
    Error: 'Movie not found!'
}
const EMPTY_MOVIE_LIST = [];

describe('MovieService', () => {
    let service,
        $httpBackend,
        $http;

    beforeEach(inject(function ($injector) {
        let configService = {
                getMovieEndpoint: sinon.stub().returns(ENDPOINT_URL),
                getApiKey: sinon.stub().returns(API_KEY)
            },
            $http = $injector.get('$http'),
            $q = $injector.get('$q');

        $httpBackend = $injector.get('$httpBackend');
        service = new MovieService(configService, $http, $q);
    }));

    describe('getMovieList', () => {
        it('should return empty array if search string shorter than 3', () => {
        });

        it('should return empty array if result is invalid', () => {
            // GIVEN
            let result;
            $httpBackend
                .expectGET(ENDPOINT_URL + '?apiKey=' + API_KEY + '&s=' + SEARCH_STRING)
                .respond(200, INVALID_MOVIE_LIST_RESPONSE);

            //WHEN
            service.getMovieList(SEARCH_STRING).then(
                (resultOfService) => result = resultOfService,
            );
            $httpBackend.flush();

            //THEN
            expect(result).to.deep.equal(EMPTY_MOVIE_LIST);
        });

        it('should return empty array if search was unsuccessful', () => {
            // GIVEN
            let result;
            $httpBackend
                .expectGET(ENDPOINT_URL + '?apiKey=' + API_KEY + '&s=' + SEARCH_STRING)
                .respond(200, MOVIE_LIST_EMPTY_RESPONSE);

            //WHEN
            service.getMovieList(SEARCH_STRING).then((resultOfService) => {
                result = resultOfService;
            });
            $httpBackend.flush();

            //THEN
            expect(result).to.deep.equal(EMPTY_MOVIE_LIST);
        });

        it('should return the correct data', () => {
            // GIVEN
            let responseData = MOVIE_LIST_RESPONSE.Search,
                expected = [
                    new MovieModel(responseData[0].imdbID, responseData[0].Title, responseData[0].Poster, responseData[0].Plot),
                    new MovieModel(responseData[1].imdbID, responseData[1].Title, responseData[1].Poster, responseData[1].Plot)],
                result;

            $httpBackend
                .expectGET(ENDPOINT_URL + '?apiKey=' + API_KEY + '&s=' + SEARCH_STRING)
                .respond(200, MOVIE_LIST_RESPONSE);

            //WHEN
            service.getMovieList(SEARCH_STRING).then((resultOfService) => {
                result = resultOfService;
            });
            $httpBackend.flush();

            //THEN
            expect(result).to.deep.equal(expected);
        });

        it('should reject and return empty array on api error', () => {
            // GIVEN
            let resolvedResult,
                rejectedResult;

            $httpBackend
                .expectGET(ENDPOINT_URL + '?apiKey=' + API_KEY + '&s=' + SEARCH_STRING)
                .respond(400, RESPONSE_BODY_ON_API_ERROR);

            //WHEN
            service.getMovieList(SEARCH_STRING)
                .then(
                    (resultOfService) => {
                        resolvedResult = resultOfService;
                    },
                    (resultOfService) => {
                        rejectedResult = EMPTY_MOVIE_LIST;
                    },
                );
            $httpBackend.flush();

            // THEN
            expect(resolvedResult).to.be.undefined;
            expect(rejectedResult).to.deep.equal(EMPTY_MOVIE_LIST);
        });
    });

    describe('getMovieDetails', () => {
        it('should return the correct data', () => {
            // GIVEN
            let expected = new MovieModel(MOVIE_DETAILS_RESPONSE.imdbID, MOVIE_DETAILS_RESPONSE.Title, MOVIE_DETAILS_RESPONSE.Poster, MOVIE_DETAILS_RESPONSE.Plot),
                result;

            $httpBackend
                .expectGET(ENDPOINT_URL + '?apiKey=' + API_KEY + '&i=' + MOVIE_ID)
                .respond(200, MOVIE_DETAILS_RESPONSE);

            //WHEN
            service.getMovieDetails(MOVIE_ID).then((resultOfService) => {
                result = resultOfService;
            });
            $httpBackend.flush();

            // THEN
            expect(result).to.deep.equal(expected);
        });

        it('should reject and return none on api error', () => {
            // GIVEN
            let resolvedResult,
                rejectedResult;

            $httpBackend
                .expectGET(ENDPOINT_URL + '?apiKey=' + API_KEY + '&i=' + MOVIE_ID)
                .respond(400, RESPONSE_BODY_ON_API_ERROR);

            //WHEN
            service.getMovieDetails(MOVIE_ID)
                .then(
                    (resultOfService) => {
                        resolvedResult = resultOfService;
                    },
                    (resultOfService) => {
                        rejectedResult = resultOfService;
                    },
                );
            $httpBackend.flush();

            // THEN
            expect(resolvedResult).to.be.undefined;
            expect(rejectedResult).to.be.undefined;
        });

        it('should reject and return none if video not found', () => {
        });
    });
});