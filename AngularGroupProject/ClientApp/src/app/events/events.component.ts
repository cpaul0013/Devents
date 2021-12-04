import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from '../Event';
import { FavService } from '../fav.service';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../../api-authorization/authorize.service';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})




/** Events component*/
export class EventsComponent {

  /** Events ctor */
  constructor(private eventservice: EventService, private favservice: FavService, private authorizeservice: AuthorizeService) {

  }


  //today: Date = new Date(2021, 11, 28, 0, 0, 0, 0);
  today: string = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}T01:00:00`;
  TempEvents: Event[]=[]
  DisplayEvents: Event[] = [];
  resultEvent: Event = {} as Event;
  public isAuthenticated: Observable<boolean>;

  ngOnInit(): void {
    this.UpdateEvents();
    this.isAuthenticated = this.authorizeservice.isAuthenticated();
  }



  UpdateEvents(): void {

    this.eventservice.getEvents().subscribe((response: any) => {
      this.DisplayEvents = response;
      
      for (var i = 0; i < this.DisplayEvents.length; i++) {
        console.log(this.DisplayEvents[i].date)
        console.log(this.today);
        if (this.DisplayEvents[i].date +""< this.today) {
          console.log(this.today);
          this.DisplayEvents.splice(i,1);
        }

      }

      console.log(this.DisplayEvents);


      for (var i = 0; i < this.DisplayEvents.length-1; i++) {
        for (var j = 0; j < this.DisplayEvents.length- i -1; j++) {
          if (this.DisplayEvents[j].date > this.DisplayEvents[j+1].date) {
            let t: Event = this.DisplayEvents[j];
            this.DisplayEvents[j] = this.DisplayEvents[j + 1];
            this.DisplayEvents[j + 1] = t;
          }

          

        }
      }



      console.log(this.DisplayEvents);

      this.filteredEvents = this.DisplayEvents;
      console.log(response);
    });
  }

  addEvent(form: NgForm): void {
    let newEvent: Event = {
      id: 0,
      name: form.form.value.name,
      date: form.form.value.date,
      location: form.form.value.location,
      description: form.form.value.description
    };
    console.log(newEvent);

    this.eventservice.addEvent(newEvent.name, newEvent.date, newEvent.location, newEvent.description).subscribe((response: any) => {
      this.resultEvent = response;
      console.log(response);
      this.UpdateEvents();
    });
  }

  addFav(eventId: number): void {

    this.favservice.addFav(eventId).subscribe((response: any) => {

      console.log(response);
    });

  }


  removeFromEvents(id: number) {
    let index: number = this.DisplayEvents.findIndex((E: Event) => E.id == id);
    this.DisplayEvents.splice(index, 1);
  }

  filteredEvents: Event[] = this.DisplayEvents;

  filterEvents(input: string) {
    this.filteredEvents = this.DisplayEvents.filter(E => E.name.includes(input));
    console.log(this.filteredEvents);
  }
}
