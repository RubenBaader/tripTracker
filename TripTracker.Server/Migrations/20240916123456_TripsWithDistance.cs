using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TripTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class TripsWithDistance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DistanceMeters",
                table: "Trips",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DistanceMeters",
                table: "Trips");
        }
    }
}
