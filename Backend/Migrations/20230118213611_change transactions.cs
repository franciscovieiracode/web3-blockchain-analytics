using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class changetransactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_transactions",
                table: "transactions");

            migrationBuilder.DropIndex(
                name: "IX_transactions_Id",
                table: "transactions");

            migrationBuilder.DropColumn(
                name: "TransactionId",
                table: "transactions");

            migrationBuilder.DropColumn(
                name: "date",
                table: "transactions");

            migrationBuilder.RenameColumn(
                name: "walletname",
                table: "transactions",
                newName: "value");

            migrationBuilder.RenameColumn(
                name: "type",
                table: "transactions",
                newName: "txreceipt_status");

            migrationBuilder.RenameColumn(
                name: "tx",
                table: "transactions",
                newName: "transactionIndex");

            migrationBuilder.RenameColumn(
                name: "stats",
                table: "transactions",
                newName: "timeStamp");

            migrationBuilder.RenameColumn(
                name: "source",
                table: "transactions",
                newName: "nonce");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "transactions",
                newName: "isError");

            migrationBuilder.RenameColumn(
                name: "formatedDate",
                table: "transactions",
                newName: "input");

            migrationBuilder.RenameColumn(
                name: "fee",
                table: "transactions",
                newName: "hash");

            migrationBuilder.RenameColumn(
                name: "classification",
                table: "transactions",
                newName: "gasUsed");

            migrationBuilder.RenameColumn(
                name: "block",
                table: "transactions",
                newName: "gasPrice");

            migrationBuilder.RenameColumn(
                name: "ammount",
                table: "transactions",
                newName: "gas");

            migrationBuilder.AddColumn<string>(
                name: "blockHash",
                table: "transactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "blockNumber",
                table: "transactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "confirmations",
                table: "transactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "contractAddress",
                table: "transactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "cumulativeGasUsed",
                table: "transactions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_transactions",
                table: "transactions",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_transactions",
                table: "transactions");

            migrationBuilder.DropColumn(
                name: "blockHash",
                table: "transactions");

            migrationBuilder.DropColumn(
                name: "blockNumber",
                table: "transactions");

            migrationBuilder.DropColumn(
                name: "confirmations",
                table: "transactions");

            migrationBuilder.DropColumn(
                name: "contractAddress",
                table: "transactions");

            migrationBuilder.DropColumn(
                name: "cumulativeGasUsed",
                table: "transactions");

            migrationBuilder.RenameColumn(
                name: "value",
                table: "transactions",
                newName: "walletname");

            migrationBuilder.RenameColumn(
                name: "txreceipt_status",
                table: "transactions",
                newName: "type");

            migrationBuilder.RenameColumn(
                name: "transactionIndex",
                table: "transactions",
                newName: "tx");

            migrationBuilder.RenameColumn(
                name: "timeStamp",
                table: "transactions",
                newName: "stats");

            migrationBuilder.RenameColumn(
                name: "nonce",
                table: "transactions",
                newName: "source");

            migrationBuilder.RenameColumn(
                name: "isError",
                table: "transactions",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "input",
                table: "transactions",
                newName: "formatedDate");

            migrationBuilder.RenameColumn(
                name: "hash",
                table: "transactions",
                newName: "fee");

            migrationBuilder.RenameColumn(
                name: "gasUsed",
                table: "transactions",
                newName: "classification");

            migrationBuilder.RenameColumn(
                name: "gasPrice",
                table: "transactions",
                newName: "block");

            migrationBuilder.RenameColumn(
                name: "gas",
                table: "transactions",
                newName: "ammount");

            migrationBuilder.AddColumn<int>(
                name: "TransactionId",
                table: "transactions",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<DateTime>(
                name: "date",
                table: "transactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_transactions",
                table: "transactions",
                column: "TransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_transactions_Id",
                table: "transactions",
                column: "Id");
        }
    }
}
