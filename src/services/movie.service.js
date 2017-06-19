const EMPTY_MOVIELIST_RESPONSE = [];

function convertResponseToMovieList(response) {
    let movies = [];

    response.forEach( item => {
        let movie = {
            title: item.Title,
            poster: item.Poster
        };
        movies.push(movie);
    });

    return movies;
}

export default class MovieService {
    constructor(configService, $http, $q) {
        "ngInject";
        this.configService = configService;
        this.$http = $http;
        this.$q = $q;
    }

    getMovieList(searchString) {
        if (searchString.length < 3) {
            return this.$q.when(EMPTY_MOVIELIST_RESPONSE)
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
                    resolve(convertResponseToMovieList(response.data.Search));
                }
                else {
                    resolve(EMPTY_MOVIELIST_RESPONSE);
                }
            }, response => {
                reject(EMPTY_MOVIELIST_RESPONSE);
            });
        })
    }
}
