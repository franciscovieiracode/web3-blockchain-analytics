using Backend.Database;
using Backend.Models;
using Backend.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Data;
using System.Text.Json.Serialization;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WalletsController : ControllerBase
    {

        private readonly LDSDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public WalletsController(LDSDBContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;

        }

        //add blockchain to user
        [Authorize]
        [HttpPost]
        [Route("addBlockchain")]
        public async Task<IActionResult> addBlockchain([FromBody] AddBlockchainRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.blockchains.Where(x => x.Id == userData.Result.Id);

            var exists = check.Any(x => x.WalletAddress == requestDto.WalletAddress);

            if (exists == false)
            {

                var block = new Blockchain()
                {
                    WalletAddress = requestDto.WalletAddress,
                    WalletName = requestDto.WalletName,
                    Id = userData.Result.Id,
                    Type = requestDto.Type
                };

                _context.blockchains.Add(block);
                _context.SaveChanges();



                return Ok(new AddWalletResult()
                {
                    result = true,
                    address = block.WalletAddress
                });
            }

            return BadRequest(new AddWalletResult()
            {
                result = false,
                reason = "Wallet already added"
            });

        }

        //add metamask to user
        [Authorize]
        [HttpPost]
        [Route("addMetamask")]
        public async Task<IActionResult> addMetamask([FromBody] MetamaskRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.metamasks.Where(x => x.Id == userData.Result.Id);

            var exists = check.Any(x => x.WalletAddress == requestDto.WalletAddress);

            if (exists == false)
            {
                var block = new Metamask()
                {
                    WalletAddress = requestDto.WalletAddress,
                    Id = userData.Result.Id
                };

                _context.metamasks.Add(block);
                _context.SaveChanges();


                return Ok(new AddWalletResult()
                {
                    result = true,
                    address = block.WalletAddress
                });
            }
            return BadRequest(new AddWalletResult()
            {
                result = false,
                reason = "Wallet already added"
            });
        }

        //add exchange to user
        [Authorize]
        [HttpPost]
        [Route("addExchange")]
        public async Task<IActionResult> addExchange([FromBody] AddExchangeRequest requestDto)
        {

            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.exchanges.Where(x => x.Id == userData.Result.Id);

            var exists = check.Any(x => x.ApiKey == requestDto.ApiKey);

            if (exists == false)
            {

                var block = new Exchange()
                {
                    accountName = requestDto.accountName,
                    connectionDescription = requestDto.connectionDescription,
                    ApiKey = requestDto.ApiKey,
                    ApliSecret = requestDto.ApliSecret,
                    Id = userData.Result.Id

                };

                _context.exchanges.Add(block);
                _context.SaveChanges();


                return Ok(new AddWalletResult()
                {
                    result = true,
                    address = block.accountName
                });
            }
            return BadRequest(new AddWalletResult()
            {
                result = false,
                reason = "Wallet already added"
            });
        }

        //get exchanges from user
        [Authorize]
        [HttpGet]
        [Route("getExchange")]
        public async Task<IActionResult> getExchange()
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.exchanges.Where(x => x.Id == userData.Result.Id)
                .Select(x => new { x.accountName, x.connectionDescription }).ToArray();


            return Ok(new AddWalletResult()
            {
                result = true,
                address = JsonSerializer.Serialize(check)
            });
        }

        //get blockchains from user
        [Authorize]
        [HttpGet]
        [Route("getBlockchain")]
        public async Task<IActionResult> getBlochain()
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.blockchains.Where(x => x.Id == userData.Result.Id)
                .Select(x => new { x.WalletAddress, x.WalletName, x.Type });


            return Ok(new AddWalletResult()
            {
                result = true,
                address = JsonSerializer.Serialize(check)
            });
        }

        //get metamask from user
        [Authorize]
        [HttpGet]
        [Route("getMetamask")]
        public async Task<IActionResult> getMetamask()
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.metamasks.Where(x => x.Id == userData.Result.Id)
                .Select(x => new { x.WalletAddress });


            return Ok(new AddWalletResult()
            {
                result = true,
                address = JsonSerializer.Serialize(check)
            });
        }


        //get all wallets names to add to dropdown in dashboard
        [Authorize]
        [HttpGet]
        [Route("getAllWalletsToDashboard")]
        public async Task<IActionResult> getAllWalletsToDashboard()
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            List<string> wallets = new List<string>();


            var check = _context.blockchains.Where(x => x.Id == userData.Result.Id)
                .Select(x => x.WalletName);

            var check1 = _context.metamasks.Where(x => x.Id == userData.Result.Id)
                .Select(x => x.WalletAddress);

            var check2 = _context.exchanges.Where(x => x.Id == userData.Result.Id)
                .Select(x => x.accountName);

            wallets.Add("All");

            wallets.AddRange(check);

            wallets.AddRange(check1);

            wallets.AddRange(check2);


            return Ok(new AddWalletResult()
            {
                result = true,
                listAddress = wallets
            });
        }

    }
}
