import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterPipe implements PipeTransform {

  transform(prices:any, search:string) {
    if(prices.length  === 0 || search ===""){
      return prices
    }
    else{
      return prices.filter((crypto:any)=>{        
        return crypto.symbol.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}
