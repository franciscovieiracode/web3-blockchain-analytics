import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactsPipe'
})
export class ContactsPipePipe implements PipeTransform {

  transform(contacts:any, searchContacts:string): any {
    if(contacts.length  === 0 || searchContacts ===""){
      return contacts
  }
  else{
    return contacts.filter((contact:any)=>{        
      return contact.name.toLowerCase().includes(searchContacts.toLowerCase())
    })
  }
  }

}
