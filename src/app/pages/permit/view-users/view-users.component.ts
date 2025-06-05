import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RoleDto } from 'src/app/models/RoleDto';
import { User } from 'src/app/models/user';
import { RolesService } from 'src/app/services/roles/roles.service';
import { UserService } from 'src/app/services/user/user.service';
import { AssignRolesComponent } from '../../Roles/assign-roles/assign-roles.component';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();

  users: User[] = [];
  error: string = '';
  loading: boolean = true;

  displayedColumns: string[] = ['position', 'name', 'email', 'positions', 'action'];
  GetMyUsers: User[] = [];
  displayedData: User[] = [];
  dataSource = new MatTableDataSource<User>(this.GetMyUsers);
  isLoading: boolean = true;
  selectedUser: User | null = null;
  sidebarOpen: boolean = false;
  userRoles: RoleDto[] = [];
  isRolesLoading: boolean = false;
  isStoreManager: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private roleService: RolesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openSidebar(user: User): void {
    this.selectedUser = user;
    this.sidebarOpen = true;
    this.fetchUserRoles(user.id);
  }

  openAddRoleDialog(): void {
    debugger;
    const dialogRef = this.dialog.open(AssignRolesComponent, {
      width: '400px',
      data: { userId: this.selectedUser?.id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchUserRoles(this.selectedUser?.id || '');
      }
    });
  }

  openAddRolesDialog(): void {
    debugger;
    const dialogRef = this.dialog.open(AssignRolesComponent, {
      width: '400px',
      data: { userId: this.selectedUser?.id, userRoles: this.userRoles }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchUserRoles(this.selectedUser?.id || '');
      }
    });
  }

  async getAllUsers() {
    try {
      const resGetAllUsers = await this.userService.getAllUsers().toPromise();
      this.GetMyUsers = <User[]>resGetAllUsers?.data;
      this.dataSource = new MatTableDataSource<User>(this.GetMyUsers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    this.selectedUser = null;
  }

  fetchUserRoles(userId: string): void {
    debugger
    this.isRolesLoading = true;
    this.roleService.getRolesForUser(userId).subscribe({
      next: (response) => {
        this.userRoles = response?.responseData || [];
        this.isRolesLoading = false;
      },
      error: (error) => {
        console.error('Error fetching roles:', error.message || error);
        this.isRolesLoading = false;
      }
    });
  }

  removeRole(roleId: number): void {
    if (!this.selectedUser?.id || roleId === null) {
      console.log("Please select a role to remove.");
      return;
    }

    const roleRequest = {
      userId: this.selectedUser.id,
      id: roleId
    };

    console.log(roleRequest);

    this.roleService.removeRoleFromUser(roleRequest).subscribe({
      next: (data) => {
        if (data.responseCode === "99") {
          console.log("Role not available for user");
        } else if (data.responseCode === "00") {
          this.toastr.success('Role removed successfully');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      },
      error: (error: any) => {
        console.error(error.error);
        this.toastr.error('Please try again');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewUser(user: User): void {
    // Placeholder for view user functionality
  }
}
