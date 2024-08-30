using TripTracker.Models;
using TripTracker.Server.Entities;

namespace TripTracker.Server.Repositories.Contracts
{
    public interface ITripRepository
    {
        // Users
        public Task<string> CreateUser(string name, string email, string password);
        public Task<User> GetUser(int id);
        public Task DeleteUser(int id);
        // Trips
        public Task<IEnumerable<TripDto>> GetTrips(int userId);
        public Task<Trip> SaveTrip(TripDto dto, int userId);
        public Task DeleteTrip(int tripId);
    }
}
