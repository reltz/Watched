export interface ISearchResult
{
	Search: ISearchResultItem[];
	totalResults: string;
	Response: string;
}

export interface ISearchResultItem
{
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

export interface IColection
{
	[x: string]: any;
	id: string;
	name: string;
	movies: IMovie[];
}

export interface IMovie
{
	Id: string;
	Title: string;
	Type: string;
	Year: string;
	Runtime: string;
	// map string to array of genres
	Genres: string[];
	Director: string;
	// map string to array of actors ??
	Actors: string[];
	Language: string;
	// map string to array of strings
	Countries: string[];
	PosterUrl: string;
	RottenTomatoesRating: number;
	IMDBRating: number;
	UserRating: number;
	UserNotes: string;
}

export interface IMovieFromApi
{
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: IRating[];
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
}

export interface IRating
{
	Source: string;
	Value: string;
}
