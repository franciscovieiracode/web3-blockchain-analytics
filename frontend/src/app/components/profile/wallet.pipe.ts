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
      return  wallet.connection.toLowerCase().includes(search.toLowerCase()) 
      || wallet.address.toLowerCase().includes(search.toLowerCase())
    })
  }
}

}
