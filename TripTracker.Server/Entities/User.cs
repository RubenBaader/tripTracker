using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripTracker.Server.Entities
{
    public class User : IdentityUser
    {
        //[Key]
        //public int UserId { get; set; }
        //public string Name { get; set; }
        //public string Email { get; set; }
        //public string Password { get; set; }
        //public string Salt { get; set; }
        public ICollection<Address>? Addresses { get; set; }
        public ICollection<Trip>? Trips { get; set; }

    }
}
