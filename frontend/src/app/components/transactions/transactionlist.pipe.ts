import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionlist'
})
export class TransactionlistPipe implements PipeTransform {

  transform(transactions:any, search:string): any {
    if(transactions.length  === 0 || search ===""){
      return transactions
  }
  else{
    return transactions.filter((tran:any)=>{        
      return tran.in.toLowerCase().includes(search.toLowerCase()) 
      || tran.out.toLowerCase().includes(search.toLowerCase()) 
      || tran.type.toLowerCase().includes(search.toLowerCase())
      || tran.date.toLowerCase().includes(search.toLowerCase())
      || tran.walletname.toLowerCase().includes(search.toLowerCase())
    })
  }
}
}
