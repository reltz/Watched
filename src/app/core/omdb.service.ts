import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IMovie, IMovieFromApi, ISearchResultItem } from '../models/api-models';

/**
 * Talks to the OMDB API for searching titles and fetching full movie details.
 */
@Injectable({ providedIn: 'root' })
export class OmdbService {
  private readonly url = environment.omdb.url;
  private readonly key = environment.omdb.apiKey;
  private readonly pages = environment.omdb.searchPages;

  /** Search by title. Pulls several pages of results and concatenates them. */
  async search(term: string): Promise<ISearchResultItem[]> {
    const base = `${this.url}/?s=${encodeURIComponent(term)}&apikey=${this.key}`;

    const requests = Array.from({ length: this.pages }, (_, i) =>
      fetch(`${base}&page=${i + 1}`).then((r) => r.json()),
    );

    const responses = await Promise.all(requests);

    const results: ISearchResultItem[] = [];
    for (const response of responses) {
      if (response?.Search) {
        results.push(...response.Search);
      }
    }
    return results;
  }

  /** Fetch full details for a single title by its IMDB id. */
  async getMovie(imdbId: string): Promise<IMovie | undefined> {
    const completeUrl = `${this.url}/?i=${imdbId}&apikey=${this.key}`;
    const response = (await fetch(completeUrl).then((r) => r.json())) as IMovieFromApi;
    return this.mapToMovie(response);
  }

  private mapToMovie(apiMovie: IMovieFromApi): IMovie | undefined {
    if (!apiMovie || apiMovie.Response === 'False') {
      return undefined;
    }

    const ratings = apiMovie.Ratings ?? [];

    return {
      Id: apiMovie.imdbID,
      Title: apiMovie.Title,
      Type: apiMovie.Type,
      Year: apiMovie.Year,
      Runtime: apiMovie.Runtime,
      Genres: apiMovie.Genre ? apiMovie.Genre.split(',').map((g) => g.trim()) : [],
      Director: apiMovie.Director,
      Actors: apiMovie.Actors ? apiMovie.Actors.split(',').map((a) => a.trim()) : [],
      Language: apiMovie.Language,
      Countries: apiMovie.Country ? apiMovie.Country.split(',').map((c) => c.trim()) : [],
      PosterUrl: apiMovie.Poster,
      RottenTomatoesRating:
        ratings.length > 1 ? Number(ratings[1].Value.replace('%', '')) : undefined,
      IMDBRating: ratings.length > 0 ? Number.parseFloat(ratings[0].Value) * 10 : undefined,
      UserRating: undefined,
      UserNotes: '',
    };
  }
}
