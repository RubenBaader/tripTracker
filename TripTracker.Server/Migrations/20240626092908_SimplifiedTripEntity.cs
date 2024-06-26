using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TripTracker.Server.Migrations
{
    /// <inheritdoc />
    public partial class SimplifiedTripEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trips_Addresses_EndAddressId",
                table: "Trips");

            migrationBuilder.DropForeignKey(
                name: "FK_Trips_Addresses_StartAddressId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_EndAddressId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_StartAddressId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "EndAddressId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "StartAddressId",
                table: "Trips");

            migrationBuilder.AddColumn<string>(
                name: "EndAddress",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StartAddress",
                table: "Trips",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndAddress",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "StartAddress",
                table: "Trips");

            migrationBuilder.AddColumn<int>(
                name: "EndAddressId",
                table: "Trips",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartAddressId",
                table: "Trips",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Trips_EndAddressId",
                table: "Trips",
                column: "EndAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_StartAddressId",
                table: "Trips",
                column: "StartAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_Addresses_EndAddressId",
                table: "Trips",
                column: "EndAddressId",
                principalTable: "Addresses",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_Addresses_StartAddressId",
                table: "Trips",
                column: "StartAddressId",
                principalTable: "Addresses",
                principalColumn: "AddressId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
