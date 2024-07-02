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
