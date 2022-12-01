import { Component, OnInit } from '@angular/core';
// for navigating to other routes
import { Router } from '@angular/router';

// for making HTTP requests
import axios from 'axios';

import { getDefaultProvider } from 'ethers';
import {
  createClient,
  connect,
  disconnect,
  getAccount,
  signMessage,
  InjectedConnector,
} from '@wagmi/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-metamask',
  templateUrl: './metamask.component.html',
  styleUrls: ['./metamask.component.css']
})
export class MetamaskComponent implements OnInit {

  data:any

  constructor(private router:Router) { }

  async ngOnInit(): Promise<void> {
    const { isConnected } = getAccount();

    if (isConnected) await disconnect(); //disconnects the web3 provider if it's already active

    const provider = await connect({ connector: new InjectedConnector() }); // enabling the web3 provider metamask

    const userData = {
      address: provider.account,
      chain: provider.chain.id,
      network: 'evm',
    };

    this.data = userData
    console.log(this.data.address);
    
    // redirect to /user
    this.router.navigate(['/dashboard']);
  }

  client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
  });
}
