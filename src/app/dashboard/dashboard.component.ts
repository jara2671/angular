import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js'; 
import { LoginResponseData } from '../models/login-response-data';
import { TokenService } from '../services/token/token.service';
import { RoleDto } from '../models/RoleDto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  userId: string = '';

  allRequests: number = 0;
  pendingRequestsCount: number = 0;
  approvedRequestsCount: number = 0;
  rejectedRequestsCount: number = 0;
  issuedRequestsCount: number = 0;
  closedRequestsCount: number = 0;

  allMyRequests: number = 0;
  mypendingRequestsCount: number = 0;
  myapprovedRequestsCount: number = 0;
  myrejectedRequestsCount: number = 0;
  myissuedRequestsCount: number = 0;
  myclosedRequestsCount: number = 0;
  allPendingRequestsCount: number = 0;

  isRequesterOnly: boolean = false;
  isAdmin: boolean = false;
  isStoreManager: boolean = false;
  isMainStoreManager: boolean = false;
  isLineManager: boolean = false;
  isHoS: boolean = false;

  constructor( private tokenService: TokenService) {
    Chart.register(...registerables); 
  }

  ngOnInit(): void {
    this.getinfo();
    // this.getAllRequests();
    // this.getAllMyRequests(this.userId);
    // this.getMyPendingApprovals(this.userId);
  }

  getinfo(){
        const loginResponse: LoginResponseData = this.tokenService.getInfo();
        this.currentUser = this.tokenService.getInfo(); 
        this.userId = this.currentUser.profile.id;

        var roles: RoleDto[] = this.currentUser.roles;
        const hasRequesterRole = roles.some(role => role.roleName.trim().toLowerCase() === 'requester'.toLowerCase());
        const hasAdminRole = roles.some(role => role.roleName.trim().toLowerCase() === 'system admin'.toLowerCase());
        const hasStoreManagerRole = roles.some(role => role.roleName.trim().toLowerCase() === 'isolator'.toLowerCase());
        const hasMainStoreManagerRole = roles.some(role => role.roleName.trim().toLowerCase() === 'permit issuer'.toLowerCase());
        const hasLineManagerRole = roles.some(role => role.roleName.trim().toLowerCase() === 'Line Manager'.toLowerCase());
        const hasHoSRole = roles.some(role => role.roleName.trim().toLowerCase() === 'HOS'.toLowerCase());


        if(hasRequesterRole && roles.length === 1){
          this.isRequesterOnly = true;
        }

        if(hasAdminRole){
          this.isAdmin = true;
        }

        if(hasStoreManagerRole){
          this.isStoreManager = true;
        }

        if(hasMainStoreManagerRole){
          this.isMainStoreManager = true;
        }

        if(hasLineManagerRole){
          this.isLineManager = true;
        }

        if(hasHoSRole){
          this.isHoS = true;
        }
        
      }

  

  createDoughnutChart() {
    const ctxDoughnut = (document.getElementById('doughnutChart') as HTMLCanvasElement).getContext('2d');
    if (ctxDoughnut) {
      new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
          labels: ['Approved', 'Pending', 'Rejected'],
          datasets: [{
            data: [this.approvedRequestsCount, this.pendingRequestsCount, this.rejectedRequestsCount],
            backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for doughnut chart');
    }
  }

  createBarLineChart() {
    const ctxBarLine = (document.getElementById('barLineChart') as HTMLCanvasElement).getContext('2d');
    if (ctxBarLine) {
      new Chart(ctxBarLine, {
        type: 'bar',
        data: {
          labels: ['All Requests', 'Approved', 'Pending', 'Rejected'],
          datasets: [
            {
              label: 'Count',
              data: [this.allRequests, this.approvedRequestsCount, this.pendingRequestsCount, this.rejectedRequestsCount],
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              type: 'bar'
            },
            {
              label: 'Trend',
              data: [this.allRequests, this.approvedRequestsCount, this.pendingRequestsCount, this.rejectedRequestsCount],
              type: 'line',
              borderColor: 'rgba(255, 99,  132, 1)',
              fill: false,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for bar/line chart');
    }
  }


  createMyDoughnutChart() {
    const ctxDoughnut = (document.getElementById('myDoughnutChart') as HTMLCanvasElement).getContext('2d');
    if (ctxDoughnut) {
      new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
          labels: ['Approved', 'Pending', 'Rejected'],
          datasets: [{
            data: [this.myapprovedRequestsCount, this.mypendingRequestsCount, this.myrejectedRequestsCount],
            backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for doughnut chart');
    }
  }

  createMyBarLineChart() {
    const ctxBarLine = (document.getElementById('myBarLineChart') as HTMLCanvasElement).getContext('2d');
    if (ctxBarLine) {
      new Chart(ctxBarLine, {
        type: 'bar',
        data: {
          labels: ['All Requests', 'Approved', 'Pending', 'Rejected'],
          datasets: [
            {
              label: 'Count',
              data: [this.allMyRequests, this.myapprovedRequestsCount, this.mypendingRequestsCount, this.myrejectedRequestsCount],
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              type: 'bar'
            },
            {
              label: 'Trend',
              data: [this.allMyRequests, this.myapprovedRequestsCount, this.mypendingRequestsCount, this.myrejectedRequestsCount],
              type: 'line',
              borderColor: 'rgba(255, 99,  132, 1)',
              fill: false,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for bar/line chart');
    }
  }

}