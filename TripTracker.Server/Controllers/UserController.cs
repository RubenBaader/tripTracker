using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TripTracker.Models;
using TripTracker.Server.Repositories.Contracts;

namespace TripTracker.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ITripRepository tripRepository;

        public UserController(ITripRepository tripRepository)
        {
            this.tripRepository = tripRepository;
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateUser(string name, string email, string password)
        {
            try
            {
                var data = await tripRepository.CreateUser(name, email, password);

                if (data == null)
                {
                    return NotFound();
                }

                return Ok(data);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            try
            {
                var rawData = await tripRepository.GetUser(id);

                var user = new UserDto
                {
                    Id = id,
                    Name = rawData.Name,
                    Email = rawData.Email,
                };

                return Ok(user);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
