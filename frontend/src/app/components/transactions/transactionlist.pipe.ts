import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionlist'
})
export class TransactionlistPipe implements PipeTransform {

  transform(transactions: any, search: string): any {
    if (transactions.length === 0 || search === "") {
      return transactions
    }
    else {
      return transactions.filter((tran: any) => {
        return tran.to.toLowerCase().includes(search.toLowerCase())
          || tran.from.toLowerCase().includes(search.toLowerCase())
          || tran.formattedDate.toLowerCase().includes(search.toLowerCase())
      })
    }
  }
}
