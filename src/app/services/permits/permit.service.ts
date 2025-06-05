import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/app/environments/environment';
import { ApiResponseObject } from 'src/app/models/api-response-object';
import { CreatePermitRequest } from 'src/app/models/CreatePermitRequest';
import { VerificationQuestion } from 'src/app/models/VericationQuestion';
import { Permit } from 'src/app/models/Permit';
import { Isolator } from 'src/app/models/isolators';
import { issuer } from 'src/app/models/permitissuer';
import { ApproveRequest } from 'src/app/models/approve';
import { VerificationResponse } from 'src/app/models/re-energizationVm';


@Injectable({
  providedIn: 'root'
})
export class PermitService {

  constructor(private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('AT')}`,
      'Content-Type': 'application/json'
    });
  }

  private request<T>(method: 'GET' | 'POST', url: string, body?: any): Observable<ApiResponseObject<T>> {
    return this.httpClient.request<ApiResponseObject<T>>(method, `${environment.apiUrl}/${url}`, {
      body,
      headers: this.getHeaders()
    });
  }

   /** Create a new permit */
  // createPermit(request: CreatePermitRequest): Observable<ApiResponseObject<any>> {
  //   debugger;
  //   return this.httpClient.post<ApiResponseObject<any>>(
  //     `${environment.apiUrl}/EnergyIsolationPermitRequest/CreatePermitRequest`,
  //     request
  //   );
  // }
  createPermit(request: CreatePermitRequest): Observable<ApiResponseObject<any>> {
    return this.request('POST', 'EnergyIsolationPermitRequest/CreatePermitRequest', request);
  }

  approvePermit(request: ApproveRequest): Observable<ApiResponseObject<Permit>> {
    return this.request('POST', 'EnergyIsolationPermitRequest/ApprovePermitRequest', request);
  }
  
  closePermit(request: ApproveRequest): Observable<ApiResponseObject<any>> {
    debugger;
    return this.request('POST', 'EnergyIsolationPermitRequest/PermitClosure', request);
  }
  
getAllIsolators(): Observable<ApiResponseObject<Isolator[]>> {
  debugger;
    return this.httpClient.get<ApiResponseObject<Isolator[]>>(
      `${environment.apiUrl}/EnergyIsolationPermitRequest/GetUsersWithIsolatorRole`
    );
}
getAllPermitIssuers(): Observable<ApiResponseObject<issuer[]>> {
  debugger;
    return this.httpClient.get<ApiResponseObject<issuer[]>>(
      `${environment.apiUrl}/EnergyIsolationPermitRequest/GetUsersWithPermitIssuerRole`
    );
}

// getAllPermits(): Observable<ApiResponseObject<Permit[]>> {
//   debugger;
//     return this.httpClient.get<ApiResponseObject<Permit[]>>(
//       `${environment.apiUrl}/EnergyIsolationPermitRequest/GetAllPermitRequests`
//     );
// }

getAllPermits(): Observable<ApiResponseObject<Permit[]>> {
  return this.request('GET', 'EnergyIsolationPermitRequest/GetAllPermitRequests');
}

getAllMyPermits(): Observable<ApiResponseObject<Permit[]>> {
  return this.request('GET', 'EnergyIsolationPermitRequest/GetMyPermitRequests');
}

getPermitsPendingClosure(): Observable<ApiResponseObject<Permit[]>> {
  debugger;
  return this.request('GET', 'EnergyIsolationPermitRequest/GetPermitsPendingClosure');
}

// getAllMyPermits(): Observable<ApiResponseObject<Permit[]>> {
//   debugger;
//   return this.httpClient.get<ApiResponseObject<Permit[]>>(
//     `${environment.apiUrl}/EnergyIsolationPermitRequest/GetMyPermitRequests`
//   );
// }

  getPendingPermits(): Observable<ApiResponseObject<Permit[]>> {
    return this.request('GET', 'EnergyIsolationPermitRequest/GetMyPendingPermitRequests');
  }

  getAllVerificationQuestions(): Observable<ApiResponseObject<VerificationQuestion[]>> {
    debugger;
    return this.httpClient.get<ApiResponseObject<VerificationQuestion[]>>(
      `${environment.apiUrl}/VerificationAndRenergizationQuestions/GetAllVerificationQuestions`
    );
  }

  getAllReEnergizationQuestions(): Observable<ApiResponseObject<VerificationQuestion[]>> {
    debugger;
    return this.httpClient.get<ApiResponseObject<VerificationQuestion[]>>(
      `${environment.apiUrl}/VerificationAndRenergizationQuestions/GetReEnergizationQuestionQuestions`
    );
  }

  submitReEnergizationResponse(response: VerificationResponse): Observable<ApiResponseObject<Permit>> {
    debugger;
    return this.request('POST', 'EnergyIsolationPermitRequest/WorkCompletion', response);
  }

}
