using TripTracker.Models;

namespace TripTracker.Server.Authentication.Contract
{
    public interface IServerAuthentication
    {
        public HashedPasswordDto CreateHashedPassword(string password);
        public bool CompareHashedPassword(string password, string hash, string salt);
    }
}
