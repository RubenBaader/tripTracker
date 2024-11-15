using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TripTracker.Server.Entities;

namespace TripTracker.Server.Controllers
{

    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<User> signInManager;

        public UserController(SignInManager<User> signInManager)
        {
            this.signInManager = signInManager;
        }

        [Authorize]
        [HttpPost]
        [Route("logout")]
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }
    }
}
