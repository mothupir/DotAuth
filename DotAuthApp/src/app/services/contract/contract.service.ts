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

  async isOrganizationRegistered(): Promise<boolean> {
    return true;
  }

  async createOrganization(name: string): Promise<void> {

  }

  async getAccessLevels(): Promise<string[]> {
    return ["Primary", "Secondary", "Tertiary"];
  }

  async addAccessLevel(name: string): Promise<void> {

  }

  async removeAccessLevel(name: string): Promise<void> {

  }

  async getUsers(accessLevel: string): Promise<{[key: string]: string}[]> {
    return [
      { name: "User 1", address: "address1" },
      { name: "User 2", address: "address2" },
      { name: "User 3", address: "address3" }
    ];
  }

  async addUser(address: string, name: string): Promise<void> {

  }

  async removeUser(address: string): Promise<void> {

  }

}
