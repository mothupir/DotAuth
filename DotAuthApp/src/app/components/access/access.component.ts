import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ContractService } from 'src/app/services/contract/contract.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent {
  organizationRegistered: boolean = false;
  organization: string = "";

  accessLevels: string[] = [];
  accessLevel: string = "";

  users: {[key: string]: string}[] = [];
  userName: string = "";
  userAddress: string = "";
  showUsersDialog: boolean = false;

  constructor(
    private contractService: ContractService,
    private confirmationService: ConfirmationService,
    private spinner: SpinnerService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.checkOrganization();
  }

  // ------------ Organization Management ------------
  async checkOrganization() {
    this.spinner.show();
    await this.contractService.isOrganizationRegistered().then(async (data: any) => {
      this.organizationRegistered = data;
      await this.getAccessLevels();
    }).catch((e: any) => {
      console.log(e);
    }).finally(() => {
      this.spinner.hide();
    })
  }

  async createOrganization() {
    this.spinner.show();
    await this.contractService.createOrganization(this.organization).then(async () => {
      await this.checkOrganization();
      this.organization = "";
    }).catch((e: any) => {
      this.messageService.add({ severity: 'error', summary: 'Create Organization', detail: `Error. Could not create organization. ${e}` });
      console.log(e);
    }).finally(() => {
      this.spinner.hide();
    })
  }

  // ------------ Access Level Management ------------
  async getAccessLevels() {
    this.spinner.show();
    await this.contractService.getAccessLevels().then((data: any) => {
      this.accessLevels = data;
    }).catch((e: any) => {
      this.messageService.add({ severity: 'error', summary: 'Load Access Levels', detail: `Error. Could not load Access Levels. ${e}` });
    }).finally(() => {
      this.spinner.hide();
    });
  }

  async addAccessLevel() {
    this.spinner.show();
    await this.contractService.addAccessLevel(this.accessLevel).then(async () => {
      await this.getAccessLevels();
      this.messageService.add({ severity: 'success', summary: 'Add Access Level', detail: `Access Level, ${this.accessLevel} added successfully...` });
      this.accessLevel = "";
    }).catch((e: any) => {
      this.messageService.add({ severity: 'error', summary: 'Add Access Level', detail: `Access Level, ${this.accessLevel} could not be added. ${e}` });
    }).finally(() => {
      this.spinner.hide();
    });
  }

  removeAccessLevel(accessLevel: string) {
    this.confirmationService.confirm({
      header: "Remove Access Level",
      message: `Are you sure that you want to remove Access Level, ${accessLevel}?`,
      accept: async () => {
        this.spinner.show();
        await this.contractService.removeAccessLevel(accessLevel).then(async () => {
          await this.getAccessLevels();
          this.messageService.add({ severity: 'success', summary: 'Remove Access Level', detail: `Access Level, ${accessLevel} removed successfully...` });
        }).catch((e: any) => {
          this.messageService.add({ severity: 'error', summary: 'Remove Access Level', detail: `Access Level, ${accessLevel} could not be removed.` });
        }).finally(async () => {
          this.spinner.hide();
        });
      }
    });
  }

  // ------------ User Management ------------
  async getUsers(level: string) {
    this.spinner.show();
    await this.contractService.getUsers(level).then((data: any) => {
      this.users = data;
      this.accessLevel = level;
    }).catch((e: any) => {
      this.messageService.add({ severity: 'error', summary: 'Get Users', detail: "Error. Could not load users." });
    }).finally(() => {
      this.toggleUserDialog();
      this.spinner.hide();
    });
  }

  async addUser() {
    this.spinner.show();
    await this.contractService.addUser(this.userAddress, this.userName).then(async () => {
      await this.getUsers(this.accessLevel);
      this.messageService.add({ severity: 'success', summary: 'Add User', detail: `User, ${this.userName} added successfully...` });
      }).catch((e: any) => {
        this.messageService.add({ severity: 'error', summary: 'Add User', detail: `User, ${this.userName} could not be added. ${e}` });
    }).finally(() => {
      this.userAddress = "";
      this.userName = "";
      this.spinner.hide();
    });
  }

  async removeUser(address: string, name: string) {
    this.confirmationService.confirm({
      header: "Remove User",
      message: `Are you sure that you want to remove User, ${name}?`,
      accept: async () => {
        this.spinner.show();
        await this.contractService.removeUser(address).then(async () => {
          await this.getUsers(this.accessLevel);
          this.messageService.add({ severity: 'success', summary: 'Remove User', detail: `User, ${name} removed successfully...` });
        }).catch((e: any) => {
          this.messageService.add({ severity: 'error', summary: 'Remove User', detail: `User, ${name} could not be removed. ${e}` });
        }).finally(async () => {
          this.spinner.hide();
        });
      }
    });
  }

  toggleUserDialog() {
    if(this.showUsersDialog) {
      this.showUsersDialog = false;
      this.accessLevel = "";
    } else {
      this.showUsersDialog = true;
    }
  }
}
