using TripTracker.;

namespace TripTracker.Server.Repositories.Contracts
{
    public interface ITripRepository
    {
        public TripDto tripDto { get; set; }
    }
}
