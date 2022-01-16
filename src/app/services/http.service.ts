import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment'
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering)
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games?key=${env.API}`, { params: params });

  }


  getGameDetails(id: number): Observable<Game> {
    const gameInfoRequest = this.http.get<Game>(`${env.BASE_URL}/games/${id}`);
    const gameTrailerRequest = this.http.get(`${env.BASE_URL}/${id}/movies`);
    const gameScreenShotsRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);

    return forkJoin({
      gameInfoRequest,
      gameTrailerRequest,
      gameScreenShotsRequest
    }).pipe(map((resp: any) => {
      return {
        ...resp['gameInfoRequest'],
        screenshots: resp['gameScreenshotsRequest']?.results,
        trailers: resp['gameTrailersRequest']?.resuts,
      }
    }))
  }


}
