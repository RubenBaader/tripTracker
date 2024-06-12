using System.ComponentModel.DataAnnotations.Schema;

namespace TripTracker.Server.Entities
{
    public class Trip
    {
        public int TripId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        [ForeignKey(nameof(StartAddress))]
        public int StartAddressId { get; set; }
        public Address StartAddress { get; set; }

        [ForeignKey(nameof(EndAddress))]
        public int EndAddressId { get; set; }
        public Address EndAddress { get; set; }
    }
}
