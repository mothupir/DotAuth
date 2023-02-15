import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Organization, Rule } from 'src/app/models/models';
import { ContractService } from 'src/app/services/contract/contract.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent {
  connected: boolean = false;
  organization?: Organization;

  currentRule?: Rule;
  showUsersDialog: boolean = false;

  constructor(
    private contractService: ContractService,
    private confirmationService: ConfirmationService,
    private spinner: SpinnerService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.getOrganization();
  }

  // ------------ Organization Management ------------
  async getOrganization() {
    this.spinner.show();
    await this.contractService.getOrganization().then(async (data: any) => {
      this.messageService.add({ 
        severity: 'success', 
        summary: 'Organization', 
        detail: "Connected to organization..." 
      });
      this.connected = true;
      this.organization = data;
    }).catch((e: any) => {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Not Found!', 
        detail: 'Organization not found...' 
      });
    }).finally(() => {
      this.spinner.hide();
    })
  }

  addOrganization(name: string) {
    this.confirmationService.confirm({
      header: 'Register Organization',
      message: 'Are you sure you want to register an organization?',
      accept: async () => {
        this.spinner.show();
        await this.contractService.addOrganization(name).then(async () => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Create Organization', 
            detail: 'Organization registered, wait for your wallet to confirm the transaction and then refresh the page to see your Organization.' });
        }).catch((e: any) => {
          this.messageService.add({ 
            severity: 'warn', 
            summary: 'Create Organization', 
            detail: 'Organization already exists...' 
          });
        }).finally(() => {
          this.spinner.hide();
        });
      }
    });
  }

  // ------------ Access Level Management ------------
  addRule(name: string) {
    this.confirmationService.confirm({
      header: 'Add Access Rule',
      message: 'Are you sure you want to add the access rule?',
      accept: async () => {
        this.spinner.show();
        await this.contractService.addRule(name).then(() => {
          this.messageService.add({
            severity: 'success', 
            summary: 'Add Access Rule', 
            detail: 'Access Rule was added successfully, wait for your wallet to confirm the transaction and then refresh the page to see your new Access Rule.'
          });
        }).catch(() => {
          this.messageService.add({
            severity: 'warn', 
            summary: 'Add Access Rule', 
            detail: 'Access Rule could not be added.'
          });
        }).finally(() => {
          this.spinner.hide();
        });
      }
    });
  }

  removeRule(uuid: string, index: number) {
    this.confirmationService.confirm({
      header: "Remove Access Rule",
      message: "Are you sure you want to remove the Access Rule?",
      accept: async () => {
        this.spinner.show();
        await this.contractService.removeRule(uuid, index).then(() => {
          this.messageService.add({
            severity: 'success', 
            summary: 'Remove Access Rule', 
            detail: 'Access Rule was removed successfully, wait for your wallet to confirm the transaction and then refresh the page.'
          });
        }).catch(() => {
          this.messageService.add({
            severity: 'warn', 
            summary: 'Remove Access Rule', 
            detail: 'Access Rule could not be removed.'
          });
        }).finally(() => {
          this.spinner.hide();
        });
      }
    });
  }

  activeRules(rules: Rule[]) {
    return rules.filter(r => r.active).length;
  }

  // ------------ User Management ------------
  addUser(address: string, name: string, uuid: string, index: number) {
    this.confirmationService.confirm({
      header: "Add New User",
      message: "Are you sure you want to add this user?",
      accept: async () => {
        this.spinner.show();
        this.contractService.addUser(address, name, uuid, index).then(() => {
          this.messageService.add({
            severity: 'success', 
            summary: 'Add User', 
            detail: 'User added successfully, wait for your wallet to confirm the transaction and then refresh the page.'
          });
        }).catch(() => {
          this.messageService.add({
            severity: 'warn', 
            summary: 'Add User', 
            detail: 'Could not add User.'
          });
        }).finally(() => {
          this.spinner.hide();
        });
      }
    });
  }

  async assign(uuid: string, ruleIndex: number, userIndex: number) {
    this.spinner.show();
    await this.contractService.assign(uuid, ruleIndex, userIndex).then(() => {
      this.messageService.add({
        severity: 'success', 
        summary: 'Revoke/Assign Access', 
        detail: 'Access revoked/assigned successfully, wait for your wallet to confirm the transaction and then refresh the page.'
      });
    }).catch(() => {
      this.messageService.add({
        severity: 'warn', 
        summary: 'Revoke/Assign Access', 
        detail: 'Could not revoke/assign access.'
      });
    }).finally(() => {
      this.spinner.hide();
    })
  }

  setRule(uuid: string) {
    this.currentRule = this.organization?.rules.find(r => r.uuid == uuid);
  }

  toggleUserDialog(uuid: string) {
    this.setRule(uuid);
    if(this.showUsersDialog) {
      this.showUsersDialog = false;
    } else {
      this.showUsersDialog = true;
    }
  }
}
