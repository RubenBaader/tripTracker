using System.Security.Cryptography;
using System.Text;
using TripTracker.Models;
using TripTracker.Server.Authentication.Contract;

namespace TripTracker.Server.Authentication
{
    public class ServerAuthentication : IServerAuthentication
    {
        private const int keySize = 64;
        private const int iterations = 350000;
        private readonly HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA256;
        public HashedPasswordDto CreateHashedPassword(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(keySize);

            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize
                );

            return new HashedPasswordDto
            {
                Hash = Convert.ToBase64String(hash),
                Salt = Convert.ToBase64String(salt),
            };
        }

        public bool CompareHashedPassword(string password, string hash, string salt)
        {
            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                Convert.FromBase64String(salt),
                iterations,
                hashAlgorithm,
                keySize
                );

            return CryptographicOperations.FixedTimeEquals(hashToCompare, Convert.FromBase64String(hash));
        }
    }
}
