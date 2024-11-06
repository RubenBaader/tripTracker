using System.Security.Claims;
using System.Text.Json.Nodes;
using System.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using TripTracker.Models;
using TripTracker.Server.Entities;
using TripTracker.Server.Repositories.Contracts;

namespace TripTracker.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly ITripRepository tripRepository;

        public TripsController(ITripRepository tripRepository)
        {
            this.tripRepository = tripRepository;
        }

        [HttpGet]
        [Route("test")]
        public async Task<ActionResult<string>> Test() 
        {
            //var cookieOptions = new CookieOptions();
            //cookieOptions.Secure = true;
            //cookieOptions.HttpOnly = true;
            //cookieOptions.Expires = DateTimeOffset.UtcNow.AddMinutes(50);

            //var cookie = Request.Cookies["User"];

            var email = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);

            if (email == null)
            {

                return Ok("No cookie");
            }
            else
            {
                //string body = cookie;

                //Response.Cookies.Append("Hello", body, cookieOptions);
                //Response.Cookies.Delete("Hello");

                return Ok("Let's compare fe17919b-29cd-48db-a2cd-49c78c949c04 to " + email.Value);
            }

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetTrips()
        {
            try
            {
                var userIdClaim = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);

                var trips = await tripRepository.GetTrips(userIdClaim.Value);

                if (trips == null)
                {
                    return NotFound();
                }

                return Ok(trips);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                                "Error retrieving data from the database");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Trip>> PostTrip([FromForm] TripDto tripDto)
        {
            try
            {
                var userIdClaim = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var newTrip = await tripRepository.SaveTrip(tripDto, userIdClaim.Value);

                if (newTrip == null)
                {
                    return NoContent();
                }

                return Ok(newTrip);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
