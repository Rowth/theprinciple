import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';


@Component({
  selector: 'app-complaintlist',
  templateUrl: './complaintlist.component.html',
  styleUrls: ['./complaintlist.component.scss', '../../homepage/homepage.component.scss', '../user/user.component.scss']
})
export class ComplaintlistComponent implements OnInit {
  newsData: any;
  p: any = 1;
  loader: boolean = true;
  constructor(private HttpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.HttpService.getData('getComplaint').subscribe(res => {
      this.newsData = res
      this.loader = false;
    })
  }
  // goToNext() {
  //   this.router.navigateByUrl('/admin-panel/addVideo');
  // }
  // routUrl(id: any) {
  //   this.router.navigateByUrl(`/admin-panel/complaintdetail/${id}`);
  // }
}
