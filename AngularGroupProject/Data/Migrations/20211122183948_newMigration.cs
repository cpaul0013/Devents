using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularGroupProject.Data.Migrations
{
    public partial class newMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Favs",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Favs_ApplicationUserId",
                table: "Favs",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Favs_EventId",
                table: "Favs",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Favs_AspNetUsers_ApplicationUserId",
                table: "Favs",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Favs_Events_EventId",
                table: "Favs",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favs_AspNetUsers_ApplicationUserId",
                table: "Favs");

            migrationBuilder.DropForeignKey(
                name: "FK_Favs_Events_EventId",
                table: "Favs");

            migrationBuilder.DropIndex(
                name: "IX_Favs_ApplicationUserId",
                table: "Favs");

            migrationBuilder.DropIndex(
                name: "IX_Favs_EventId",
                table: "Favs");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Favs");
        }
    }
}
