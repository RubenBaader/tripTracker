using System;

namespace TripTracker.Models
{
    public class TripDto
    {
        public string StartAddress {  get; set; }
        public string EndAddress { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

    }
}