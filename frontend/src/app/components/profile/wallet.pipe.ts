import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wallet'
})
export class WalletPipe implements PipeTransform {

  transform(wallets:any, search:string): any {
    if(wallets.length  === 0 || search ===""){
      return wallets
  }
  else{
    return wallets.filter((wallet:any)=>{        
      return  wallet.WalletName?.toLowerCase().includes(search.toLowerCase())
      || wallet.WalletAddress?.toLowerCase().includes(search.toLowerCase()) 
      || wallet.accountName?.toLowerCase().includes(search.toLowerCase()) 
    })
  }
}

}
