using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class loginHistorytable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_rules_AspNetUsers_Id",
                table: "rules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_rules",
                table: "rules");

            migrationBuilder.RenameTable(
                name: "rules",
                newName: "Rules");

            migrationBuilder.RenameIndex(
                name: "IX_rules_Id",
                table: "Rules",
                newName: "IX_Rules_Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rules",
                table: "Rules",
                column: "RulesId");

            migrationBuilder.CreateTable(
                name: "LoginHistory",
                columns: table => new
                {
                    idLogin = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    browser = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    data = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoginHistory", x => x.idLogin);
                    table.ForeignKey(
                        name: "FK_LoginHistory_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LoginHistory_Id",
                table: "LoginHistory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rules_AspNetUsers_Id",
                table: "Rules",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rules_AspNetUsers_Id",
                table: "Rules");

            migrationBuilder.DropTable(
                name: "LoginHistory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rules",
                table: "Rules");

            migrationBuilder.RenameTable(
                name: "Rules",
                newName: "rules");

            migrationBuilder.RenameIndex(
                name: "IX_Rules_Id",
                table: "rules",
                newName: "IX_rules_Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_rules",
                table: "rules",
                column: "RulesId");

            migrationBuilder.AddForeignKey(
                name: "FK_rules_AspNetUsers_Id",
                table: "rules",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
