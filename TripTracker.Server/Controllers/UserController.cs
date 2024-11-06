using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TripTracker.Models;
using TripTracker.Server.Authentication.Contract;
using TripTracker.Server.Repositories.Contracts;

namespace TripTracker.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ITripRepository tripRepository;
        private readonly IServerAuthentication serverAuthentication;

        public UserController(ITripRepository tripRepository,
                        IServerAuthentication serverAuthentication)
        {
            this.tripRepository = tripRepository;
            this.serverAuthentication = serverAuthentication;
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<string>> CreateUser(string name, string email, string password)
        {
            try
            {
                //TODO: verify username not taken

                //get hash
                var pwData = serverAuthentication.CreateHashedPassword(password);

                var data = await tripRepository.CreateUser(name, email, hash: pwData.Hash, salt: pwData.Salt);

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
                    Name = rawUser.UserName,
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
