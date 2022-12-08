import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { ModalTransactionComponent } from './modal-transaction/modal-transaction.component';


@Component({
  selector: 'app-transactionlist',
  templateUrl: './transactionlist.component.html',
  styleUrls: ['./transactionlist.component.css']
})
export class TransactionlistComponent implements OnInit {

	finalEth = "https://etherscan.io/tx/"
	teste:any
  closeResult = '';
  transactions =[
	{"date":"08-12-2022","type":"SENT","in":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c","out":"0x388c818ca8b9251b393131c08a736a67ccb19297","ammount":"0.005 ETH","price":"9,20","tx":"0xe3b8e7972df0ac67a5a6e9b56c0782504b3ab7857e968daefed6d4de902562cc", "classification":"Taxable","source":"0xe3b8e7972df0ac67a5a6e9b56c0782504b3ab7857e968daefed6d4de902562cc", "block":"16135188", "fee":"13.916777895 Gwei", "stats":"Sucess"},
	{"date":"25-10-2022","type":"RECEIVE","in":"0xb3023d5e75010f7404dbfdeea69aaf3733e64558","out":"0x9e10f4a990c994316f5ef244def17434d6fb7ba4","ammount":"0.0016 ETH","price":"2,00","tx":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "classification":"Taxable","source":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "block":"16135188", "fee":"13.916777895 Gwei","stats":"Sucess"},
	{"date":"08-12-2022","type":"SENT","in":"0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5","out":"0x388c818ca8b9251b393131c08a736a67ccb19297","ammount":"0.19708 ETH","price":"242,75","tx":"0xf1ba99136d8241fd46b83cde30fced69137fda5447401b63ad6c4cfc9fb59b68", "classification":"Taxable","source":"0xf1ba99136d8241fd46b83cde30fced69137fda5447401b63ad6c4cfc9fb59b68", "block":"16136459", "fee":"29.102018185 Gwei","stats":"Sucess"},
	{"date":"01-12-2022","type":"SENT","in":"0x14259515c9d957dd6ce338f346afa80e05f4ca29","out":"0xbfef411d9ae30c5b471d529c838f1abb7b65d67f","ammount":"0.003 ETH","price":"3,83","tx":"0x4941da1aaf81d64a317d9c9c57348c261a6d208775a8adaee554c51581f4ae5f", "classification":"Taxable","source":"0x4941da1aaf81d64a317d9c9c57348c261a6d208775a8adaee554c51581f4ae5f", "block":"16135188", "fee":"13.916777895 Gwei","stats":"Sucess"},
	{"date":"01-12-2022","type":"SENT","in":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c","out":"0x388c818ca8b9251b393131c08a736a67ccb19297","ammount":"0.0262 ETH","price":"32,28","tx":"0x1d62af0949d90d962c706871124009e2757fe887f55f791c64b18864969e26c3", "classification":"Taxable","source":"0x1d62af0949d90d962c706871124009e2757fe887f55f791c64b18864969e26c3", "block":"16135188", "fee":"13.916777895 Gwei","stats":"Sucess"},
	{"date":"30-10-2022","type":"SENT","in":"0xf2f5c73fa04406b1995e397b55c24ab1f3ea726c","out":"0x388c818ca8b9251b393131c08a736a67ccb19297","ammount":"0.03456 ETH","price":"42,64","tx":"0x365fdb0da49ebdb89cb22180bfe2e4278d6b7a220af8b94d99a30e693d0dcaae", "classification":"Taxable","source":"0x365fdb0da49ebdb89cb22180bfe2e4278d6b7a220af8b94d99a30e693d0dcaae", "block":"16135188", "fee":"13.916777895 Gwei","stats":"Sucess"},
	{"date":"25-10-2022","type":"RECEIVE","in":"0xb3023d5e75010f7404dbfdeea69aaf3733e64558","out":"0x9e10f4a990c994316f5ef244def17434d6fb7ba4","ammount":"0.0016 ETH","price":"2,00","tx":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "classification":"Taxable","source":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "block":"16135188", "fee":"13.916777895 Gwei","stats":"Sucess"},
	{"date":"25-10-2022","type":"RECEIVE","in":"0xb3023d5e75010f7404dbfdeea69aaf3733e64558","out":"0x9e10f4a990c994316f5ef244def17434d6fb7ba4","ammount":"0.0016 ETH","price":"2,00","tx":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "classification":"Taxable","source":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "block":"16135188", "fee":"13.916777895 Gwei","stats":"Sucess"},
	{"date":"25-10-2022","type":"RECEIVE","in":"0xb3023d5e75010f7404dbfdeea69aaf3733e64558","out":"0x9e10f4a990c994316f5ef244def17434d6fb7ba4","ammount":"0.0016 ETH","price":"2,00","tx":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "classification":"Taxable","source":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "block":"16135188", "fee":"13.916777895 Gwei","stats":"Sucess"},
	{"date":"25-10-2022","type":"RECEIVE","in":"0xb3023d5e75010f7404dbfdeea69aaf3733e64558","out":"0x9e10f4a990c994316f5ef244def17434d6fb7ba4","ammount":"0.0016 ETH","price":"2,00","tx":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "classification":"Taxable","source":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "block":"16135188", "fee":"13.916777895 Gwei","stats":"Sucess"},
	{"date":"25-10-2022","type":"RECEIVE","in":"0xb3023d5e75010f7404dbfdeea69aaf3733e64558","out":"0x9e10f4a990c994316f5ef244def17434d6fb7ba4","ammount":"0.0016 ETH","price":"2,00","tx":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "classification":"Taxable","source":"0x17ed533c28b39d01aa1bb64049a2d58200f6d9af604ce9637bf56c80ed910741", "block":"16135188", "fee":"13.916777895 Gwei","stats":"Sucess"},
	{"date":"19-10-2022","type":"SENT","in":"0x690b9a9e9aa1c9db991c7721a92d351db4fac990","out":"0xe688b84b23f322a994a53dbf8e15fa82cdb71127","ammount":"0.29477 ETH","price":"363,68","tx":"0x22c4fe6e7830e60d3a315de83cec1b7f4c2196902071ad2aeaafb08594d76ede", "classification":"Taxable","source":"0x22c4fe6e7830e60d3a315de83cec1b7f4c2196902071ad2aeaafb08594d76ede", "block":"16135188", "fee":"13.916777895 Gwei","stats":"Sucess"}]
	search:string
  copied:boolean
  page=1
  pageSize:number

	constructor(private modalService: NgbModal,private _clipboardService: ClipboardService,private http:HttpClient) {
		this.copied=false
		this.search=""
		this.pageSize=10
	}

		openDetails(transaction:any){
			const modalRef = this.modalService.open(ModalTransactionComponent,{
				size:"lg", centered:true
			});
			modalRef.componentInstance.fromParent = transaction;
			
		}

	copy(data:any){
		this._clipboardService.copy(data)

		this.copied=true
    
		setTimeout(()=>{this.copied=false},2000)
	}


  ngOnInit(): void {
  }

}
 

