import { Component } from '@angular/core';
import { ContractService } from './contracts/contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DotAuthTestWeb';
  authorized: boolean = false;
  dispalyAccessDenied: boolean = false;

  constructor(private contractService: ContractService) {}

  async authorize(orgAddress: string) {
    await this.contractService.authorize(orgAddress).then((data) => {
      this.authorized = data;
      this.dispalyAccessDenied = !data;
    });
  }
}
