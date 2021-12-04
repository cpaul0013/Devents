/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { EventDetailsComponent } from './event-details.component';

let component: EventDetailsComponent;
let fixture: ComponentFixture<EventDetailsComponent>;

describe('event-details component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ EventDetailsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(EventDetailsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});