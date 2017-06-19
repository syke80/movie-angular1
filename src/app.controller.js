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
        this.movieService.getMovieList(this.searchString)
            .then(
                (movies => this.handleFetchSuccessful(movies)),
                (movies => this.handleFetchError(movies))
            );
    }

    handleFetchSuccessful(movies) {
        console.log('successful fetch in app controller', movies);
        this.movies = movies
    }

    handleFetchError(movies) {
        console.log('unsuccessful fetch in app controller', movies);
    }
}
