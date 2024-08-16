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
                    return BadRequest();
                }

                return Ok(data);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            try
            {
                var rawUser = await tripRepository.GetUser(id);

                if (rawUser == null)
                {
                    return NoContent();
                }

                var userDto = new UserDto
                {
                    Id = id,
                    Name = rawUser.Name,
                    Email = rawUser.Email,
                };

                return Ok(userDto);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
