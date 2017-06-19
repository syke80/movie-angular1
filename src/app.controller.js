export default class AppController {
    constructor(movieService) {
        "ngInject";
        this.movieService = movieService;
        this.movies = [];
        this.searchString = '';
    }

    onChangeSearchString(searchString) {
        this.searchString = searchString;
        this.fetchMovies();
    }

    fetchMovies() {
        this.movieService.getDetailedMovieList(this.searchString)
            .then(
                (movies => this.handleFetchSuccessful(movies)),
                (movies => this.handleFetchError(movies))
            );
    }

    handleFetchSuccessful(movies) {
        this.movies = movies
    }

    handleFetchError(movies) {
        // TODO
    }
}
