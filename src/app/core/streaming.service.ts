import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { IStreamingInfo } from '../models/api-models';
import { AuthService } from './auth.service';

/**
 * Fetches streaming availability for a title. The actual RapidAPI call happens
 * server-side in our Firebase function (which holds the secret key); this just
 * talks to that authenticated endpoint and returns the grouped result.
 */
@Injectable({ providedIn: 'root' })
export class StreamingService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  private readonly url = environment.streaming.apiUrl;
  private readonly defaultCountry = environment.streaming.country;

  /** Fetch streaming availability for a title by its IMDB id. */
  async getStreaming(imdbId: string, country = this.defaultCountry): Promise<IStreamingInfo> {
    const token = await this.auth.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const endpoint = `${this.url}/${encodeURIComponent(imdbId)}?country=${country}`;
    return firstValueFrom(this.http.get<IStreamingInfo>(endpoint, { headers }));
  }
}
