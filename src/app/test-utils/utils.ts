import { IColection, IMovie } from "../Models/ApiModels";

export function makeFakeMovie(movie?: Partial<IMovie>): IMovie
{
	return {
		Id: "12345",
		Title: "My movie 1",
		Type: "Movie",
		Year: "1900",
		Runtime: "120",
		Genres: ["comedy"],
		Director: "Director 1",
		Actors: ["actor 1"],
		Language: "en",
		Countries: ["canada"],
		PosterUrl: "url1",
		RottenTomatoesRating: 10,
		IMDBRating: 10,
		UserRating: 10,
		UserNotes: "",
		...movie,
	}
}

export function makeFakeCollection(col?: Partial<IColection>): IColection
{
	const movies = col.movies ?? [makeFakeMovie()];
	delete col.movies;
	return {
		id: "12345-collection",
		name: "collection test1",
		movies: movies,
		...col
	}
}
