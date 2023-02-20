import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-read-complaint',
  templateUrl: './read-complaint.component.html',
  styleUrls: ['./read-complaint.component.scss','../../homepage/homepage.component.scss']
})
export class ReadComplaintComponent implements OnInit {

  ComplaintData: any;
  ShowComplaintBox: boolean = false;
  complaint: any;
  replyButton: boolean = false;
  replayData: any;
  showMsgBox: boolean = false;
  commentData: string = '';
  complaintText = ''
  getComplaint: any;
  paramsId: any;
  constructor(private HttpService: HttpService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params): void => {
      this.paramsId = params
      console.log(params, "---");
      this.getComplaintData();
    })
  }
  getComplaintData() {
    this.HttpService.getSubCategory('getComplaintId', this.paramsId?.id).subscribe(res => {
      console.log(res, "---");
      this.ComplaintData = res
      this.complaintText = res.rplyBody;
    })
  }
  sendComplain() {
    let complData = {
      email: this.ComplaintData?.email,
      complText: this.complaintText
    }
    this.HttpService.addData('ComplaintMail', complData).subscribe(res => {
      this.toastr.success('Complaint Successfully sent');
      this.getComplaintData();
    });
  }
  // goToPage() {
  //   this.router.navigateByUrl('admin-panel/complaintlist');
  // }
  // openBox() {
  //   this.ShowComplaintBox = true;
  // }

  // sendComplaintInfo(event: any) {
  //   this.complaint = {
  //     email: this.ComplaintData.email,
  //     comment: event.target.value
  //   }
  // }


  // updateComplaint() {
  //   this.HttpService.ComplaintMail('ComplaintMail', this.complaint).subscribe(res => {
  //     this.toastr.success('Complaint Successfully sent');
  //   });
  //   this.ShowComplaintBox = false;
  //   this.replyButton = true;
  // }
  // getReply() {
  //   this.HttpService.getRply('getRply', this.ComplaintData.email).subscribe(res => {
  //     this.replayData = res;
  //     this.commentData = this.replayData[0].rplyBody
  //   })
  //   this.showMsgBox = true

  // }
}
