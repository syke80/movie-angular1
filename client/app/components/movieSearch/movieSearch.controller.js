class MovieSearchController {
    constructor() {
        this.searchString = '';
    }

    onChangeSearchString() {
        let searchString = this.searchString;
        this.searchChange({searchString});
    }
}

export default MovieSearchController;