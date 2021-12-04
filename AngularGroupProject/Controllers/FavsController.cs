using AngularGroupProject.Data;
using AngularGroupProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularGroupProject.Controllers
{   [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavsController : ControllerBase
    {
        public ApplicationDbContext FavsContext;
        public FavsController(ApplicationDbContext _context)
        {
            FavsContext = _context;
        }

        [HttpGet("allFavs")]
        public List<Event> allFavs()
        {
            List<Event> favEvents = new List<Event>();
            List<Fav> allFavs = new List<Fav>();
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            allFavs = FavsContext.Favs.Where(F => F.UserId == currentUserID).ToList();
            
            
            foreach (Fav f in allFavs)
            {
                Event favEvent=FavsContext.Events.Find(f.EventId);
                favEvents.Add(favEvent);
            }
            return favEvents;

            //return FavsContext.Events.Where(E => allFavs.Any(F => F.EventId == E.Id)).ToList();
            
        }

        [HttpPost("addFavs")]
        public Fav addFav(int eventId)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            Fav newFav = new Fav()
            {
                EventId = eventId,
                UserId = currentUserID

            };

            List<Fav> favList = FavsContext.Favs.ToList();

            foreach (Fav f in favList)
                if (f.EventId==eventId) 
                    if(f.UserId==currentUserID)
                        return newFav;

            FavsContext.Add(newFav);
            FavsContext.SaveChanges();

            return newFav;
        }

        [HttpDelete("deleteFavs/{eventId}")]
        public Fav deleteFav(int eventId)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            Fav deletedFav = FavsContext.Favs.Where(F => F.EventId == eventId && F.UserId == currentUserID).First();
            FavsContext.Favs.Remove(deletedFav);
            FavsContext.SaveChanges();
            return deletedFav;
        }

    }
}

