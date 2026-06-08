export interface ISearchResultItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface ISearchResult {
  Search: ISearchResultItem[];
  totalResults: string;
  Response: string;
}

export interface ICollection {
  id: string;
  name: string;
  movies: IMovie[];
}

export interface IMovie {
  Id: string;
  Title: string;
  Type: string;
  Year: string;
  Runtime: string;
  Genres: string[];
  Director: string;
  Actors: string[];
  Language: string;
  Countries: string[];
  PosterUrl: string;
  RottenTomatoesRating?: number;
  IMDBRating?: number;
  UserRating?: number;
  UserNotes: string;
}

export interface IRating {
  Source: string;
  Value: string;
}

export interface IMovieFromApi {
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
  Response: string;
}
