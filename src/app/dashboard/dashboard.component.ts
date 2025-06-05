import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { LoginResponseData } from '../models/login-response-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Admin metrics
  totalApplications: number = 0;
  inProgressCount: number = 0;
  liveApplicationsCount: number = 0;
  pendingApprovalCount: number = 0;

  // Employee metrics
  myRequestsCount: number = 0;
  myPendingCount: number = 0;
  myApprovedCount: number = 0;
  myRejectedCount: number = 0;

  // Table columns
  displayedColumns: string[] = ['id', 'name', 'requester', 'status', 'actions'];
  myRequestColumns: string[] = ['id', 'type', 'status', 'created', 'actions'];

  // Data sources
  recentApplications: any[] = [];
  myRecentRequests: any[] = [];

  // User role
  isAdmin: boolean = false;
  currentUser: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getInfo();
    this.loadDashboardData();
    this.initializeCharts();
  }

  getInfo() {
    const loginResponse: LoginResponseData = this.tokenService.getInfo();
    this.currentUser = this.tokenService.getInfo();
    const roles = this.currentUser.roles;
    this.isAdmin = roles.some((role: { roleName: string; }) => 
      role.roleName.trim().toLowerCase() === 'system admin'.toLowerCase()
    );
  }

  loadDashboardData() {
    // Simulate loading data - replace with actual API calls
    if (this.isAdmin) {
      this.totalApplications = 150;
      this.inProgressCount = 45;
      this.liveApplicationsCount = 85;
      this.pendingApprovalCount = 20;

      this.recentApplications = [
        { id: 1, name: 'CRM System', requester: 'John Doe', status: 'Pending' },
        { id: 2, name: 'HR Portal', requester: 'Jane Smith', status: 'In Progress' },
        // Add more mock data
      ];
    } else {
      this.myRequestsCount = 12;
      this.myPendingCount = 3;
      this.myApprovedCount = 8;
      this.myRejectedCount = 1;

      this.myRecentRequests = [
        { id: 1, type: 'New Application', status: 'Pending', created: new Date() },
        { id: 2, type: 'Change Request', status: 'Approved', created: new Date() },
        // Add more mock data
      ];
    }
  }

  initializeCharts() {
    if (this.isAdmin) {
      this.initializeAdminCharts();
    } else {
      this.initializeEmployeeCharts();
    }
  }

  initializeAdminCharts() {
    // Application Status Chart
    new Chart('applicationStatusChart', {
      type: 'bar',
      data: {
        labels: ['In Progress', 'Live', 'Pending Approval'],
        datasets: [{
          label: 'Applications by Status',
          data: [this.inProgressCount, this.liveApplicationsCount, this.pendingApprovalCount],
          backgroundColor: ['#FF9F40', '#4BC0C0', '#FF6384']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Monthly Trends Chart
    new Chart('monthlyTrendsChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Applications',
          data: [12, 19, 15, 17, 14, 15],
          borderColor: '#36A2EB',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  initializeEmployeeCharts() {
    new Chart('myRequestsChart', {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Approved', 'Rejected'],
        datasets: [{
          data: [this.myPendingCount, this.myApprovedCount, this.myRejectedCount],
          backgroundColor: ['#FF9F40', '#4BC0C0', '#FF6384']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // Action handlers
  createNewRequest() {
    this.router.navigate(['/home/create-application-request']);
  }

  createChangeRequest() {
    // Implement change request navigation
  }

  viewDetails(app: any) {
    // Implement view details dialog
  }

  assignOwner(app: any) {
    // Implement assign owner dialog
  }

  setDeadline(app: any) {
    // Implement deadline setting dialog
  }

  viewRequestDetails(req: any) {
    // Implement request details dialog
  }

  addComment(req: any) {
    // Implement comment dialog
  }
}