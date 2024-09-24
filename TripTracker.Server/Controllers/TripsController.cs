using System.Text.Json.Nodes;
using System.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        [Route("test")]
        public async Task<ActionResult<string>> Test() 
        {
            var cookieOptions = new CookieOptions();
            cookieOptions.Secure = true;
            cookieOptions.HttpOnly = true;
            cookieOptions.Expires = DateTimeOffset.UtcNow.AddMinutes(50);

            var cookie = Request.Cookies["Hello"];
            
            if (cookie == null)
            {

                var response = new Dictionary<string, JsonNode> { ["Message"] = "I'm an endpoint, short and stout" };
                Response.Cookies.Append("Hello", "1", cookieOptions);

                return Ok(response);
            }
            else
            {
                int body = int.Parse(cookie);
                body++;


                Response.Cookies.Append("Hello", body.ToString(), cookieOptions);
                //Response.Cookies.Delete("Hello");

                return Ok(body);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripDto>>> GetTrips(int userId)
        {
            try
            {
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
