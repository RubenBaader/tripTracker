using System.Text.Json.Nodes;
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
            
            // var output = JsonConvert
            return Ok(new Dictionary<string,JsonNode>{["Message"] = "I'm an endpoint, short and stout"});
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
