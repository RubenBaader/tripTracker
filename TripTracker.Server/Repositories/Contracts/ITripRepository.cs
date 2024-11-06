using TripTracker.Models;
using TripTracker.Server.Entities;

namespace TripTracker.Server.Repositories.Contracts
{
    public interface ITripRepository
    {
        // Users
        public Task<string> CreateUser(string name, string email, string hash, string salt);
        public Task<User> GetUser(int id);
        public Task DeleteUser(int id);
        // Trips
        public Task<IEnumerable<TripDto>> GetTrips(string userId);
        public Task<Trip> SaveTrip(TripDto dto, string userId);
        public Task DeleteTrip(int tripId);
    }
}
