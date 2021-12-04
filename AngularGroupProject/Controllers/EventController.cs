using AngularGroupProject.Data;
using AngularGroupProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularGroupProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        public ApplicationDbContext EventContext;
        public EventController(ApplicationDbContext _context)
        {
            EventContext = _context;
        }

        [HttpGet("allEvents")]
        public List<Event> allEvents()
        {
            List<Event> allEvents = new List<Event>();
            allEvents = EventContext.Events.ToList();
            return allEvents;


        }

        [HttpGet("getEvent/{id}")]
        public Event getEventById(int Id)
        {

           return EventContext.Events.Find(Id);



        }

        [HttpPost("addEvent")]
        public Event addEvent(string name, DateTime date, string location, string description)
        {
            Event newEvent = new Event()
            {
                Name = name,
                Date = date,
                Location = location,
                Description = description
            };
            EventContext.Add(newEvent);
            EventContext.SaveChanges();
            return newEvent;
        }

        [HttpDelete("deleteEvent/{id}")]
        public Event deleteEvent(int id)
        {
            Event deletedEvent = EventContext.Events.Find(id);
            EventContext.Events.Remove(deletedEvent);
            EventContext.SaveChanges();
            return deletedEvent;
        }

    }
}
