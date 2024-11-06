using System.ComponentModel.DataAnnotations.Schema;

namespace TripTracker.Server.Entities
{
    public class Address
    {
        public int AddressId { get; set; }
        public string AddressLine { get; set; }

        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }
    }
}
