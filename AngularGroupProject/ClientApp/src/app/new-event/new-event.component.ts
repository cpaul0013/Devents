import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from '../Event';
import { EventService } from '../event.service';

@Component({
    selector: 'app-new-event',
    templateUrl: './new-event.component.html',
    styleUrls: ['./new-event.component.css']
})
/** newEvent component*/
export class NewEventComponent {
    /** newEvent ctor */
  constructor(private eventservice: EventService) {

  }

  resultEvent: Event = {} as Event;

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
    });
  }

  replaceText(): void {
    const app = document.getElementById("added");
    app.innerHTML = "Your event has been added.";
  }
}
