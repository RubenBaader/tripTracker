using Microsoft.EntityFrameworkCore;
using TripTracker.Models;
using TripTracker.Server.Data;
using TripTracker.Server.Entities;
using TripTracker.Server.Repositories.Contracts;

namespace TripTracker.Server.Repositories
{
    public class TripRepository : ITripRepository
    {
        private readonly TripDBContext tripDBContext;

        public TripRepository(TripDBContext tripDBContext)
        {
            this.tripDBContext = tripDBContext;
        }

        // Users
        public async Task<string> CreateUser(string name, string email, string password)
        {
            try
            {
                var user = new User
                {
                    Name = name,
                    Email = email,
                    Password = password,
                    Salt = "xyz"
                };

                var data = await tripDBContext.Users.AddAsync(user);
                await tripDBContext.SaveChangesAsync();

                return data.ToString();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error at repository:", ex.Message);
                throw;
            }
        }

        public async Task<User> GetUser(int id)
        {
            try
            {
                var data = await tripDBContext.Users.FindAsync(id);

                if (data == null)
                {
                    throw new Exception("User not found");
                }

                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Task DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        //Trips
        public async Task<Trip> SaveTrip(TripDto tripDto, int userId)
        {
            try
            {
                Trip trip = new Trip
                {
                    StartAddress = tripDto.StartAddress,
                    EndAddress = tripDto.EndAddress,
                    StartTime = tripDto.StartTime,
                    EndTime = tripDto.EndTime,
                    DistanceMeters = tripDto.DistanceMeters,
                    UserId = userId
                };

                var data = await tripDBContext.Trips.AddAsync(trip);

                if (data == null)
                {
                    throw new Exception("Trip cannot be saved");
                }

                await tripDBContext.SaveChangesAsync();
                return data.Entity;
            }
            catch (Exception)
            {

                throw;
            }

            
            
        }

        public async Task<IEnumerable<TripDto>> GetTrips(int userId)
        {
            var data = await (from trip in  tripDBContext.Trips
                              where trip.UserId == userId
                              select new TripDto
                              {
                                  Id = trip.TripId,
                                  StartAddress = trip.StartAddress,
                                  EndAddress = trip.EndAddress,
                                  StartTime = trip.StartTime,
                                  EndTime = trip.EndTime,
                                  DistanceMeters = trip.DistanceMeters,
                              }).ToListAsync();

            return data;
        }

        public Task DeleteTrip(int tripId)
        {
            throw new NotImplementedException();
        }
    }
}
