import { Component } from '@angular/core';
import { ethers } from 'ethers';
import { ContractService } from 'src/app/services/contract/contract.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  organization: string = "No organization found...";
  connected: boolean = false;

  provider: ethers.providers.Web3Provider;;

  constructor(private spinner: SpinnerService, private contractService: ContractService) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }

  async ngOnInit() {
    this.spinner.show();
    await this.provider.send("eth_requestAccounts", []).then(() => {
    }).finally(async () => {
      await this.contractService.getOrganization().then((data: any) => {
        this.connected = true;
        this.organization = data.name;
      }).catch(()=> {}).finally(() => {
        this.spinner.hide();
      })
    });
  }
}
