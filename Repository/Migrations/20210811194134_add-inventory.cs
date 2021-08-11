using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class addinventory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pasatiempos",
                table: "Persona");

            migrationBuilder.CreateTable(
                name: "Inventarios",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Stock = table.Column<int>(nullable: false),
                    IdSucursal = table.Column<int>(nullable: false),
                    IdProducto = table.Column<int>(nullable: false),
                    FechaAlta = table.Column<DateTime>(nullable: false),
                    RowVersion = table.Column<DateTime>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventarios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inventarios_Producto_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Producto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Inventarios_Sucursal_IdSucursal",
                        column: x => x.IdSucursal,
                        principalTable: "Sucursal",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Inventarios_IdProducto",
                table: "Inventarios",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Inventarios_IdSucursal",
                table: "Inventarios",
                column: "IdSucursal");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Inventarios");

            migrationBuilder.AddColumn<string>(
                name: "Pasatiempos",
                table: "Persona",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
