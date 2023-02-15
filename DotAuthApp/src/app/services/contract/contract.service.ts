import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { abi } from 'src/app/contracts/abi';
import { Organization, Rule, User } from 'src/app/models/models';
import { environment } from 'src/environments/environment';
import { v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  provider: ethers.providers.Web3Provider;
  contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    this.contract = new ethers.Contract(environment.contract, abi, this.provider.getSigner());
  }

  async getWalletAddress() {
    let address = "";
    await this.provider.send("eth_requestAccounts", []).then((data: any) => {
      address = data[0];
    });
    return address;
  }

  async addOrganization(name: string) {
    const response = await this.contract.addOrganization(name);
    response.wait();
    return response;
  }

  async getOrganization() {
    const response = await this.contract.getOrganization();
    let org = new Organization();
    org.owner = response.owner;
    org.name = response.name;
    response.rules.forEach((r: any) => {
      let rule = new Rule();
      rule.owner = r.owner;
      rule.uuid = r.uuid;
      rule.name = r.name;
      rule.active = r.active;
      rule.index = Number(r.index);
      r.users.forEach((u: any) => {
        let user = new User();
        user.owner = u.owner;
        user.name = u.name;
        user.active = u.active;
        user.index = Number(u.index);
        rule.users.push(user);
      });
      org.rules.push(rule);
    });
    return org;
  }

  async addRule(name: string) {
    const response = await this.contract.addRule(uuid(), name);
    response.wait();
    return response;
  }

  async removeRule(uuid: string, index: number){
    const response = await this.contract.removeRule(uuid, index);
    response.wait();
    return response;
  }

  async addUser(address: string, name: string, uuid: string, index: number) {
    const response = await this.contract.addUser(address, name, uuid, index);
    response.wait();
    return response;
  }

  async assign(uuid: string, ruleIndex: number, userIndex: number) {
    const response = await this.contract.assign(uuid, ruleIndex, userIndex);
    response.wait();
    return response;
  }
}
