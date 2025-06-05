export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    phoneNumber: string;
    isEmailConfirmed: boolean;
    isSuperAdmin: boolean;
    departmentId: number;
    designationId: number;
    id: string;
    isActive: boolean;
    roleId:number;
    roleName:string;
    designationName:string;
    departmentName:string;
    isManager:boolean;
    managerId:string;
    functionName:string;
    mustChangePassword:boolean;
  //  createdDate: Date;
}
