import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  provider: ethers.providers.Web3Provider;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }

  async isOrganizationRegistered(): Promise<any> {
    return true;
  }

  async createOrganization(name: string): Promise<any> {

  }

  async getAccessLevels(): Promise<string[]> {
    return ["Primary", "Secondary", "Tertiary"];
  }

  async createAccessLevel(name: string): Promise<any> {

  }

  async removeAccessLevel(name: string): Promise<any> {

  }

}
