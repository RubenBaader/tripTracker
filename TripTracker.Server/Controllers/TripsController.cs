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
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly ITripRepository tripRepository;

        public TripsController(ITripRepository tripRepository)
        {
            this.tripRepository = tripRepository;
        }

        [Authorize]
        [HttpGet]
        [Route("test")]
        public async Task<ActionResult<string>> Test() 
        {
            var cookieOptions = new CookieOptions();
            cookieOptions.Secure = true;
            cookieOptions.HttpOnly = true;
            cookieOptions.Expires = DateTimeOffset.UtcNow.AddMinutes(50);

            //var cookie = Request.Cookies["User"];

            //if (cookie == null)
            //{

            //    return Forbid();
            //}
            //else
            //{
            //    string body = cookie;

            //    Response.Cookies.Append("Hello", body, cookieOptions);
            //    //Response.Cookies.Delete("Hello");

            //    return Ok("Hello, " + body);
            //}

                // return Forbid();
                return Ok("No cookies");
            }
            else
            {
                string body = cookie;

            return Ok("Hello there");

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetTrips()
        {
            try
            {
                var userId = int.Parse(Request.Cookies["User"]);

                var trips = await tripRepository.GetTrips(userId);

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
                var userId = 1;

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var newTrip = await tripRepository.SaveTrip(tripDto, userId);

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
