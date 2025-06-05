import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Permit } from 'src/app/models/Permit';


interface Worker {
  name: string;
  company: string;
}

interface Verification {
  question: string;
  answer: 'Yes' | 'No';
  comment: string;
}


@Component({
  selector: 'app-permit-details',
  templateUrl: './permit-details.component.html',
  styleUrls: ['./permit-details.component.scss']
})
export class PermitDetailsComponent {
  
  permit!: Permit;
  // workers: Worker[] = [];

  constructor(
    private router: Router,
  
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && navigation.extras.state['permit']) {
      this.permit = navigation.extras.state['permit'];
    } else {
      this.permit;
    }
  }

  ngOnInit() {
    console.log(this.permit);
  }

  getFullNameFromEmail(email: string) {
    const localPart = email?.split('@')[0];
    const segments = localPart?.split('.');
    if (segments.length < 2) {
      return ''; 
    }
    // 3) take the first two segments as first+last name
    const [first, last] = segments;
    
    const capitalize = (s: string) =>
      s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    return `${capitalize(first)} ${capitalize(last)}`;
  }

 

  // --- Dynamic lists ---
  @Input() workers: Worker[] = [
    { name: 'Alice Johnson', company: 'Acme Co.' },
    { name: 'Bob Smith',     company: 'BuildIt Ltd.' }
  ];

  @Input() issueVerifications: Verification[] = [
    { question: 'Is equipment isolated?', answer: 'Yes', comment: 'Verified lockout' },
    { question: 'Are warning signs in place?', answer: 'No',  comment: 'Need to install' }
  ];

  @Input() reenergizeVerifications: Verification[] = [
    { question: 'Is area clear?',        answer: 'Yes', comment: 'No personnel inside' },
    { question: 'Is equipment functional?', answer: 'Yes', comment: 'Test passed' }
  ];




  
}




