import MovieModel from '../models/movie.model.js';

const EMPTY_MOVIELIST = [];
const EMPTY_MOVIE = {};

function convertMovieListResponseToMovieArray(response) {
    let movies = [];

    response.forEach( item => {
        let movie = new MovieModel(item.imdbID, item.Title, item.Poster);
        movies.push(movie);
    });

    return movies;
}

function convertMovieResponseToMovie(response) {
    return new MovieModel(response.imdbID, response.Title, response.Poster, response.Plot);
}

export default class MovieService {
    constructor(configService, $http, $q) {
        "ngInject";
        this.configService = configService;
        this.$http = $http;
        this.$q = $q;
    }

    getDetailedMovieList(searchString) {
        return this.$q((resolve, reject) => {
            this.getMovieList(searchString)
                .then(movies => {
                    movies = movies;
                    movies.forEach(movie => {
                        this.getMovieDetails(movie.id).then( detailedMovie => {
                            movie.description = detailedMovie.description;
                        });
                    });
                    resolve(movies);
                },
                movies => {
                    reject(movies);
                });
        });
    }

    getMovieList(searchString) {
        if (searchString.length < 3) {
            return this.$q.when(EMPTY_MOVIELIST)
        }

        return this.$q((resolve, reject) => {
            this.$http({
                method: 'GET',
                url: this.configService.getMovieEndpoint(),
                params: {
                    apiKey: this.configService.getApiKey(),
                    s: searchString
                }
            }).then(response => {
                if (response.data && response.data.Search) {
                    resolve(convertMovieListResponseToMovieArray(response.data.Search));
                }
                else {
                    resolve(EMPTY_MOVIELIST);
                }
            }, response => {
                reject(EMPTY_MOVIELIST);
            });
        })
    }

    getMovieDetails(imdbId) {
        return this.$q((resolve, reject) => {
            this.$http({
                method: 'GET',
                url: this.configService.getMovieEndpoint(),
                params: {
                    apiKey: this.configService.getApiKey(),
                    i: imdbId
                }
            }).then(response => {
                console.log('!!!DEBUG!!!', response);
                if (response.data) {
                    resolve(convertMovieResponseToMovie(response.data));
                }
                else {
                    resolve(EMPTY_MOVIE);
                }
            }, response => {
                reject(EMPTY_MOVIE);
            });
        })
    }

    play2(id) {
        var deferred = this.$q.defer();

            if (id > 3) {
                console.log('!!!! play2 done');
                deferred.resolve({myStatus: 'done'});
            }
            else {
                console.log('!!!!! play2 re');
                deferred.reject({myStatus: 'error'});
            }

        return deferred.promise;
    }

    play(imdbId) {
/*
        return this.$http({
            method: 'GET',
            url: this.configService.getMovieEndpoint(),
            params: {
                apiKey: this.configService.getApiKey(),
                i: imdbId
            }
        });
        */

        return this.$http({
            method: 'GET',
            url: this.configService.getMovieEndpoint(),
            params: {
                apiKey: this.configService.getApiKey(),
                i: imdbId
            }
        }).then(response => {
            console.log('!!!DEBUG!!!', response.data);
        }, response => {
            console.log('!!!DEBUG!!! rejected', response.data);
        });

    }
}
