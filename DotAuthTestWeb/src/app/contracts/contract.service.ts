import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import { abi } from './abi';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  provider: ethers.providers.Web3Provider;
  contract: ethers.Contract;

  constructor() { 
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    this.contract = new ethers.Contract(
      environment.contract, abi, this.provider.getSigner()
    );
  }

  async authorize(orgAddress: string) {
    let authorized = false;
    await this.provider.send("eth_requestAccounts", []).then(async data => {
      if(!orgAddress) {
        orgAddress = data[0];
      }
      authorized = await this.contract.authorize(orgAddress);
    }).catch(() => {});
    return authorized;
  }
}
