import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) {

  }

  getFavorites(): any {
    return this.http.get(this.baseUrl + 'api/Favs/allFavs');
  }

  addFav(eventId: number): any {
    return this.http.post(this.baseUrl + `api/Favs/addFavs?eventId=${eventId}`, {});
  }

  deleteFav(id: number): any {
    return this.http.delete(this.baseUrl + `api/Favs/deleteFavs/${id}`);
  }
}
