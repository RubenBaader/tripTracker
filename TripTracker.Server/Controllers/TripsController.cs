using Microsoft.AspNetCore.Mvc;
using TripTracker.Models;
using TripTracker.Server.Repositories.Contracts;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
        //public TripDto PostTrip(string address)
        //public ActionResult<TripDto> PostTrip([FromBody] TripDto tripDto)
        public ActionResult<TripDto> PostTrip(string startAddress, string endAddress, DateTime startDate, DateTime endDate)
        {
            try
            {
                var userId = 1;

                var tripDto = new TripDto
                {
                    StartAddress = startAddress,
                    EndAddress = endAddress,
                    StartTime = startDate,
                    EndTime = endDate,
                };

                tripRepository.SaveTrip(tripDto, userId);
                return Ok(tripDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }
    }
}
