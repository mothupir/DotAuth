import { Component } from '@angular/core';
import { ethers } from 'ethers';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  address: string = "";
  connected: boolean = true;
  message: string = "Please make sure you are connected to your wallet before you continue...";

  provider: ethers.providers.Web3Provider;;

  constructor(private spinner: SpinnerService) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }

  ngOnInit() {
    this.connectWallet();
  }

  connectWallet = async () => {
    this.spinner.show();

    await this.provider.send("eth_requestAccounts", []).then((data: any) => {
      this.address = data[0];
      this.connected = true;
    }).catch((e: any) => {
      this.message = e.message;
      this.connected = false;
    }).finally(() => {
      this.spinner.hide();
    });
  }
}
