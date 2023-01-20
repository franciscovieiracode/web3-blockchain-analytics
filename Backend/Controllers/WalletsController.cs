using Backend.Database;
using Backend.Models;
using Backend.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Data;
using System.Text.Json.Serialization;
using System.Net;
using System;
using Newtonsoft.Json.Linq;
using System.Numerics;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WalletsController : ControllerBase
    {

        private readonly LDSDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        readonly string coingeckoEthPriceRightNow = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
        readonly string coingeckoEthDetails = "https://api.coingecko.com/api/v3/coins/ethereum";
        readonly string coingeckoPriceDate = "https://api.coingecko.com/api/v3/coins/ethereum/history?date=";
        readonly string api_key_eth = "XIYAZ7UAR7HW14WT5TXP19RJR486FZCWEH";
        readonly string etherscan = "https://api.etherscan.io/";
        readonly BigInteger ETH_CONVERTER = BigInteger.Pow(10, 18);

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
        public async Task<IActionResult> addMetamask([FromBody] AddMetamaskRequest requestDto)
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

            List< Object> wallets = new List<Object>();


            var check = _context.blockchains.Where(x => x.Id == userData.Result.Id)
                .Select(x => new { x.WalletName, x.WalletAddress, x.Type });

            var check1 = _context.metamasks.Where(x => x.Id == userData.Result.Id)
                .Select(x => new { x.WalletAddress });

            var check2 = _context.exchanges.Where(x => x.Id == userData.Result.Id)
                .Select(x => new { x.accountName, x.connectionDescription, x.ApiKey, x.ApliSecret });

            wallets.AddRange(check);

            wallets.AddRange(check1);

            wallets.AddRange(check2);


            return Ok(new AddWalletResult()
            {
                result = true,
                listAddress = wallets
            });
        }


        //get ethereum details such as balance and profit
        [Authorize]
        [HttpPost]
        [Route("getEthereumDetails")]
        public async Task<IActionResult> getEthereumDetails([FromBody] GetWalletsRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            using (var client = new HttpClient())
            {
                var balanceRequest = await client.GetAsync(etherscan+"api?module=account&action=balance&address="+requestDto.walletAddress+"&tag=latest&apikey=XIYAZ7UAR7HW14WT5TXP19RJR486FZCWEH");
                var balance = await balanceRequest.Content.ReadAsStringAsync();


                var profitRequest = await client.GetAsync(etherscan+"api?module=account&action=txlist&address="+requestDto.walletAddress+ "&startblock=0&endblock=99999999&pag=1&offset=10&sort=asc&apikey="+api_key_eth);
                var profitSerialized = await profitRequest.Content.ReadAsStringAsync();
                double totalProfit = 0;
                double totalInvested = 0;
                double time123 =0;
                var profit = JObject.Parse(profitSerialized);

                var ethDetailsUn = await client.GetAsync(coingeckoEthDetails);
                var ethDetailsUnSerialized = await ethDetailsUn.Content.ReadAsStringAsync();
                var ethDetailsReal = JObject.Parse(ethDetailsUnSerialized).ToString();
                

                //todays price
                var priceToday = await client.GetAsync(coingeckoEthPriceRightNow);
                var priceTodaySerialized = await priceToday.Content.ReadAsStringAsync();
                var priceTodayReal = JObject.Parse(priceTodaySerialized);
                var todaysPrice = (decimal)priceTodayReal["ethereum"]["usd"];

                BigInteger teste = 0;
                if (profit["result"] != null)
                {

                    foreach (var transaction in profit["result"])
                    {

                       if (transaction["from"].ToString().ToLower().Equals(requestDto.walletAddress.ToLower()))
                        {

                            BigInteger timestamp = BigInteger.Parse(transaction["timeStamp"].ToString());
                            DateTime date = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
                            date = date.AddSeconds((long)timestamp).ToLocalTime();
                            string dateSellTime = date.ToString("dd-MM-yyyy");

                            //when sold
                            //var priceAtm = await client.GetAsync(coingeckoPriceDate+dateSellTime);
                            //var priceAtmSerialized = await priceAtm.Content.ReadAsStringAsync();
                            //var priceCoin = JObject.Parse(priceAtmSerialized);
                            //var priceWhenSold = (decimal)priceCoin["market_data"]["current_price"]["usd"];


                            double weiAmount = (double)transaction["value"];
                            double ethAmount = (double)weiAmount / (double)1000000000000000000.0;
                            //should be pricewhensold instead of 1400
                            double usdAmount = (ethAmount * (double)1500) - (ethAmount* (double)todaysPrice);

                            totalProfit += usdAmount;


                            //BigInteger valueWei = BigInteger.Parse(transaction["value"].ToString());
                            //BigInteger valueEther = (valueWei / 1000000000000000000) * 1400;
                            //time123 = valueEther;

                            time123 = (double)usdAmount;
                        }
                        else if(transaction["to"].ToString().ToLower().Equals(requestDto.walletAddress.ToLower()))
                        {
                            BigInteger timestamp = BigInteger.Parse(transaction["timeStamp"].ToString());
                            DateTime date = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
                            date = date.AddSeconds((long)timestamp).ToLocalTime();
                            string dateSellTime = date.ToString("dd-MM-yyyy");


                            //when bought
                            //var priceAtm = await client.GetAsync(coingeckoPriceDate+dateSellTime);
                            //var priceAtmSerialized = await priceAtm.Content.ReadAsStringAsync();
                            //var priceCoin = JObject.Parse(priceAtmSerialized);
                            //var priceWhenSold = (decimal)priceCoin["market_data"]["current_price"]["usd"];

                            double weiAmount = (double)transaction["value"];
                            double ethAmount = (double)weiAmount / (double)1000000000000000000.0;
                            //should be pricewhensold instead of 1400
                            double usdAmount = (ethAmount * (double)2400);

                            totalInvested += usdAmount;
                        }

                    }
                }
                else
                {
                    return BadRequest(new GetDetailsWallet()
                    {
                        result = false,
                        reason = "Api down"
                    }); 
                }


                return Ok(new GetDetailsWallet()
                {
                    result = true,
                    balance = balance,
                    profit = totalProfit.ToString(),
                    CoinDetail = (string)ethDetailsReal,
                    priceCoin = todaysPrice.ToString(),
                    totalInvested = totalInvested.ToString()
                }) ;
            }

        }

        //get cardano details
        [Authorize]
        [HttpPost]
        [Route("getCardanoDetails")]
        public async Task<IActionResult> getCardanoDetails([FromBody] GetWalletsRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            using (var client = new HttpClient())
            {
                var response = await client.GetAsync("https://api.etherscan.io/api?module=account&action=balance&address=" + requestDto.walletAddress + "&tag=latest&apikey="+api_key_eth);
                var result = await response.Content.ReadAsStringAsync();
                return Ok(new AddWalletResult()
                {
                    result = true,
                    address = JsonSerializer.Serialize(result)
                });
            }

        }

        [Authorize]
        [HttpPost]
        [Route("deleteWallet")]
        public async Task<IActionResult> deleteWallet([FromBody] GetWalletsRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            if (requestDto.walletAddress != null)
            {
                var blockchainToDelete = _context.blockchains.FirstOrDefault(x => x.Id == userData.Result.Id && x.WalletAddress == requestDto.walletAddress);
                if (blockchainToDelete != null)
                {
                    _context.blockchains.Remove(blockchainToDelete);
                    _context.SaveChanges();

                    return Ok(new AddWalletResult()
                    {
                        result = true,
                        reason = "Deleted with success"
                    });
                }
            }
            else if (requestDto.accountName != null)
            {
                var coinbaseToDelete = _context.exchanges.FirstOrDefault(x => x.Id == userData.Result.Id && x.accountName == requestDto.accountName);
                if (coinbaseToDelete != null)
                {
                    _context.exchanges.Remove(coinbaseToDelete);
                    _context.SaveChanges();

                    return Ok(new AddWalletResult()
                    {
                        result = true,
                        reason = "Deleted with success"
                    });
                }
            }
            return BadRequest(new AddWalletResult()
            {
                result = false,
                reason = "Empty data"
            });
        }


    }
}
