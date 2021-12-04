import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../Event';
import { ActivatedRoute } from '@angular/router';
import { FavService } from '../fav.service';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css']
})
/** event-details component*/
export class EventDetailsComponent {
  /** event-details ctor */
  constructor(private authorizeservice: AuthorizeService, private eventservice: EventService, private favservice: FavService, private router: ActivatedRoute) {

  }

  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;
  public companyName: string = "clockworks.com"
  public isAdmin: boolean = false;
  public dateOnly: string[] = [];
  public day: string = "";
  public month: string = "";
  public year: string = "";
  public timeOnly: string[] = [];
  public hour: number = 0;
  public minute: string = "";
  public ampm: string = "AM";
  resultEvent: Event = {} as Event;
  
  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    let ID: number = Number(routeParams.get("id"));
    this.eventservice.getEventById(ID).subscribe((response: any) => {
      this.resultEvent = response;
      console.log(response);
      this.dateOnly = response.date.split('T')[0].split('-');
      console.log(response.date);
      this.day = this.dateOnly[2];
      this.month = this.dateOnly[1];
      this.year = this.dateOnly[0];

      this.timeOnly = response.date.split('T')[1].split(':');
      this.hour = +this.timeOnly[0];

      if (this.hour > 12) {
        this.ampm = "PM"
      }

      this.hour = this.hour % 12;
      if (this.hour == 0) {
        this.hour = 12;
      }
      this.minute = this.timeOnly[1];
    });

    this.isAuthenticated = this.authorizeservice.isAuthenticated();
    this.checkAdmin();
  }

  checkAdmin(): void {
    this.userName = this.authorizeservice.getUser().pipe(map(u => u && u.name));
    this.userName.subscribe((response: string) => {
      if (response.includes(this.companyName)) {
        this.isAdmin = true;
      }
    })
  }

  deleteEvent(eventId: number): void {
    this.eventservice.deleteEvent(eventId).subscribe((response: any) => {
      console.log(response);
    });
     
  };

  addFav(eventId: number): void {

    this.favservice.addFav(eventId).subscribe((response: any) => {

      console.log(response);
    });

  }

  replaceDetails(): void {

    const app = document.getElementById("details");
    app.innerHTML = "This event has been deleted.";

  }
}
