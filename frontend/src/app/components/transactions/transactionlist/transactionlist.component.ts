import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { TransactionService } from 'src/app/services/transactions/transaction.service';
import { ModalTransactionComponent } from './modal-transaction/modal-transaction.component';


@Component({
	selector: 'app-transactionlist',
	templateUrl: './transactionlist.component.html',
	styleUrls: ['./transactionlist.component.css']
})
export class TransactionlistComponent implements OnInit {

	readonly ETH_CONVERTER = 10**18

	dropdownLabels = ["Default: 28%", "Salary", "Minning", "Staking"]
	finalEth = "https://etherscan.io/tx/"
	finalEthAd = "https://etherscan.io/address/"
	teste: any
	closeResult = '';

	transactions: any[] = []
	errorMessage: String
	classification: any

	search: string
	copied: boolean
	page = 1
	pageSize: number
	name: string
	address: string
	clickedPrice: boolean
	clickedDate: boolean

	constructor(private modalService: NgbModal,
		private _clipboardService: ClipboardService, private http: HttpClient, private titleService: Title,
		private getTransactions: TransactionService) {
		this.copied = false
		this.search = ""
		this.pageSize = 10
		this.name = ""
		this.address = ""
		this.titleService.setTitle("Transactions")
		this.clickedPrice = false
		this.clickedDate = false
		this.errorMessage = ""
	}

	openDetails(transaction: any) {
		const modalRef = this.modalService.open(ModalTransactionComponent, {
			size: "lg", centered: true
		});
		modalRef.componentInstance.fromParent = transaction;
	}

	open(content: any) {
		this.modalService.open(content);
	}

	copy(data: any) {
		this._clipboardService.copy(data)

		this.copied = true

		setTimeout(() => { this.copied = false }, 2000)
	}

	sortByPrice() {
		if (this.clickedPrice == false) {
			let newTransactions = this.transactions.sort((a: any, b: any) => parseFloat(a.totalCoin) - parseFloat(b.totalCoin));
			this.transactions = newTransactions
			this.clickedPrice = true
		}
		else {
			let newTransactions = this.transactions.sort((a: any, b: any) => parseFloat(b.totalCoin) - parseFloat(a.totalCoin));
			this.transactions = newTransactions
			this.clickedPrice = false
		}
	}

	sortbyDate() {
		if (this.clickedDate == false) {
			let newTransactions = this.transactions.sort((a: any, b: any) => parseFloat(a.timeStamp) - parseFloat(b.timeStamp));
			this.transactions = newTransactions
			this.clickedDate = true
		} else {
			let newTransactions = this.transactions.sort((a: any, b: any) => parseFloat(b.timeStamp) - parseFloat(a.timeStamp));
			this.transactions = newTransactions
			this.clickedDate = false
		}
	}

	ngOnInit(): void {
		this.getTransactions.getTransactions().subscribe({
			next: (data) => {
				if (data && data.status == "true") {
					console.log(data);
					this.transactions = data.result

					this.transactions = this.transactions.map(transaction => {
						var parsedBalance = (parseFloat(transaction["value"]))
						var totalBalance = (parsedBalance / this.ETH_CONVERTER)
						return { ...transaction, totalBalance };
					});

					this.transactions = this.transactions.map(transaction => {
						var parsedBalance = (parseFloat(transaction["value"]))
						console.log(parseFloat(data.priceCoin));
						var totalCoin = (parsedBalance / this.ETH_CONVERTER) * parseFloat(data.priceCoin)
					return { ...transaction, totalCoin };
					});
					
					this.transactions = this.transactions.map(transaction => {
						var newDate = new Date(parseInt(transaction["timeStamp"]) * 1000 );
						var formattedDate = newDate.getDate() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getFullYear();
						return { ...transaction, formattedDate };
					});

					this.transactions = this.transactions.map(transaction => {
						var classification = "Default: 28%"
						return { ...transaction, classification };
					});


					this.transactions = this.transactions.map(transaction => {
						var gasPrice = (parseFloat(transaction["gasPrice"]));
						var gasUsed = (parseFloat(transaction["gasUsed"]));

						var fee = (gasPrice * gasUsed) / this.ETH_CONVERTER;
						return { ...transaction, fee };
					});

					console.log(this.transactions);
				}
			},
			error: (error) => {
				console.log(error.error);
				if (error.status == 401) {
					this.errorMessage = "Error load transactions"
				}
			},
			complete: () => console.info('Transactions load completed')
		})
	}
	

}


