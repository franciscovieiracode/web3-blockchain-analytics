using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        readonly string coingeckoEthPriceRightNow = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
        private readonly LDSDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public TransactionsController(LDSDBContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;

        }

        [Authorize]
        [HttpGet]
        [Route("getTransactionsBlockchain")]
        public async Task<IActionResult> getTransactionsBlockchains()
        {
            var user = _userManager.GetUserId(User);
            var userData = await _userManager.FindByEmailAsync(user);

            //todays price
            var walletTransactions = new HttpClient();
            var priceToday = await walletTransactions.GetAsync(coingeckoEthPriceRightNow);
            var priceTodaySerialized = await priceToday.Content.ReadAsStringAsync();
            var priceTodayReal = JObject.Parse(priceTodaySerialized);
            var todaysPrice = (decimal)priceTodayReal["ethereum"]["usd"];

            var addressess = await _context.blockchains.Where(x => x.Id == userData.Id).Select(x => new { x.WalletAddress }).ToListAsync();

            foreach(var address in addressess)
            {
                var token = "BI2IZ14WHJJ3JTIMUVC9PAEYK359C7M3HJ";

                var url = "https://api.etherscan.io/api?module=account&action=txlist&address=" + address.WalletAddress + "&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=" + token;

                
                var result = await walletTransactions.GetAsync(url);
                var json = await result.Content.ReadAsStringAsync();
                var transactions = JObject.Parse(json);

                if (transactions != null)
                {
                    foreach (var transaction in transactions["result"])
                    {
                        if (_context.transactions.Any(x => x.hash == (string)transaction["hash"]))
                        {
                            continue;
                        }
                        else
                        {
                            var trans = new Transactions()
                            {
                                blockNumber = (string)transaction["blockNumber"],
                                timeStamp = (string)transaction["timeStamp"],
                                hash = (string)transaction["hash"],
                                blockHash = (string)transaction["blockHash"],
                                from = (string)transaction["from"],
                                to = (string)transaction["to"],
                                value = (string)transaction["value"],
                                gas = (string)transaction["gas"],
                                gasPrice = (string)transaction["gasPrice"],
                                gasUsed = (string)transaction["gasUsed"],
                                address = address.WalletAddress.ToString(),
                                Id = userData.Id
                            };
                            _context.transactions.Add(trans);
                        }
                    }
                    await _context.SaveChangesAsync();
                }
                else
                {
                    return BadRequest(new AddTransactionsResult()
                    {
                        status = "false",
                        message = "Wallet already added"
                    });
                }
            }

            List<Object> wallets = new List<Object>();
            var resultTransaction = _context.transactions.Where(x => x.Id == userData.Id).Select(x => new TransactionData
            {
                blockNumber = x.blockNumber,
                timeStamp = x.timeStamp,
                hash = x.hash,
                blockHash = x.blockHash,
                from = x.from,
                to = x.to,
                value = x.value,
                gas = x.gas,
                gasPrice = x.gasPrice,
                gasUsed = x.gasUsed,
                address = x.address,
                Id = x.Id
            });

            wallets.AddRange(resultTransaction);

            return Ok(new AddTransactionsResult()
            {
                status = "true",
                message = "Add transactions sucessfully",
                result = wallets,
                priceCoin = todaysPrice.ToString(),
            });
        }
    }
}
