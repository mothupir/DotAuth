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
  accessLevels: string[] = [];
  accessLevel: string = "";

  users: string[] = [];
  user: string = "";
  showUsersDialog: boolean = false;

  organizationRegistered: boolean = false;
  organization: string = "";

  constructor(
    private contractService: ContractService,
    private confirmationService: ConfirmationService,
    private spinner: SpinnerService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.checkOrganization();
  }

  async checkOrganization() {
    this.spinner.show();
    await this.contractService.isOrganizationRegistered().then(async (data: boolean) => {
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
    }).catch((e: any) => {
      console.log(e);
    }).finally(() => {
      this.spinner.hide();
    })
  }

  async getAccessLevels() {
    this.spinner.show();
    await this.contractService.getAccessLevels().then((data: string[]) => {
      this.accessLevels = data;
    }).catch((e: any) => {
      console.error(e);
    }).finally(() => {
      this.spinner.hide();
    });
  }

  async createAccessLevel() {
    this.spinner.show();
    await this.contractService.createAccessLevel(this.accessLevel).then(async () => {
      await this.getAccessLevels();
      this.messageService.add({ severity: 'success', summary: 'Add Access Level', detail: `Access Level, ${this.accessLevel} added successfully...` });
      this.accessLevel = "";
    }).catch((e: any) => {
      this.messageService.add({ severity: 'error', summary: 'Add Access Level', detail: `Access Level, ${this.accessLevel} could not be added.` });
      console.error(e);
    }).finally(() => {
      this.spinner.hide();
    });
  }

  removeAccessLevel(accessLevel: string) {
    this.confirmationService.confirm({
      header: "Remove Access Level",
      message: `Are you sure that you want to delete AccessLevel, ${accessLevel}?`,
      accept: async () => {
        await this.contractService.removeAccessLevel(accessLevel).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Remove Access Level', detail: `Access Level, ${accessLevel} removed successfully...` });
        }).catch((e: any) => {
          this.messageService.add({ severity: 'error', summary: 'Remove Access Level', detail: `Access Level, ${accessLevel} could not be removed.` });
          console.log(e);
        }).finally(() => {
          this.getAccessLevels();
        });
      }
    });
  }

  async getUsers(accessLevel: string) {
    this.showUsersDialog = true;
  }

  async addUser(address: string) {

  }

  async removeUser(address: string) {
    
  }
}
