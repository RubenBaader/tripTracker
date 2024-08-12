using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TripTracker.Models;
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

        [HttpPost]
        public async Task<ActionResult<TripDto>> PostTrip([FromForm] TripDto tripDto)
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
