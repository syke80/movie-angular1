class MovieSearchController {
    constructor() {
        this.searchString = '';
    }

    onChangeSearchString() {
        console.log('search string has been changed', this.searchString);
        let searchString = this.searchString;
        this.searchChange({searchString});
    }
}

export default MovieSearchController;