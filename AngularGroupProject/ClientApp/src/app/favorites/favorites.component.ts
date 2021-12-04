import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from '../event.service';
import { FavService } from '../fav.service';
import { Favorite } from '../Favorite';


@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})



/** Favorites component*/
export class FavoritesComponent {

  DisplayFavs: Event[] = [];
  /** Favorites ctor */
  constructor(private favService: FavService) {



  }

  countFavs: number = 0;

  ngOnInit(): void {
    this.UpdateFavs();
  }

  UpdateFavs(): void {
    this.favService.getFavorites().subscribe((response: any) => {
      this.DisplayFavs = response;
      this.countFavs = this.DisplayFavs.length;
      //console.log(response);
    });
  }

  deleteFavorite(eventId: number): void {
    this.favService.deleteFav(eventId).subscribe((response: any) => {
      console.log(response);
      this.UpdateFavs();
    });
  }
}
