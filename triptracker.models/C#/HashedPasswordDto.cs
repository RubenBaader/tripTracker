namespace TripTracker.Models
{
    public class HashedPasswordDto
    {
        public string Hash { get; set; }
        public string Salt { get; set; }
    }
}
