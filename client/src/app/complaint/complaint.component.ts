import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss','../aboutus/aboutus.component.scss']
})
export class ComplaintComponent implements OnInit {
  addComplaintData: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private HttpService: HttpService, private toastr: ToastrService) {
    this.addComplaintData = fb.group({
      channelName: ['', Validators.required],
      programmeTitle: ['', Validators.required],
      programmeDate: ['', Validators.required],
      broadcastTime: [Validators.required],
      complaint: ['', Validators.required],
      formalTitle: ['', Validators.required],
      firstName: ['', Validators.required],
      surName: ['', Validators.required],
      address: ['', Validators.required],
      mobileNo: ['', Validators.required],
      phoneNo: [''],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      complaintDate: ['', Validators.required]

    })
  }
  ngOnInit(): void {
  }

  sendComplaintData() {
    let complaintData = {
      channelName: this.addComplaintData.get('channelName').value,
      programmeTitle: this.addComplaintData.get('programmeTitle').value,
      broadcastTime: this.addComplaintData.get('broadcastTime').value,
      complaint: this.addComplaintData.get('complaint').value,
      formalTitle: this.addComplaintData.get('formalTitle').value,
      firstName: this.addComplaintData.get('firstName').value,
      surName: this.addComplaintData.get('surName').value,
      address: this.addComplaintData.get('address').value,
      mobileNo: this.addComplaintData.get('mobileNo').value,
      phoneNo: this.addComplaintData.get('phoneNo').value,
      email: this.addComplaintData.get('email').value,
      complaintDate: this.addComplaintData.get('complaintDate').value,
    }
    this.HttpService.addData('addComplaint', complaintData).subscribe(res => { res ? this.toastr.success('Your Complaint Successfully Submit') && this.addComplaintData.reset() : '' })
  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
