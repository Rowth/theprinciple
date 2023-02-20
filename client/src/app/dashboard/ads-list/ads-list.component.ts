import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss', '../user/user.component.scss']
})
export class AdsListComponent implements OnInit {
  adsArray = [];
  adsCount: any;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  };
  modalRef: any;
  adsId: any;
  loader: boolean = true;
  constructor(private fd: FormBuilder, private toastr: ToastrService, private httpService: HttpService, private activeARouter: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAds();
  }
  getAds() {
    this.loader = true;
    this.adsArray = [];
    this.httpService.getData('getAds').subscribe(res => {
      this.adsArray = res.findAds;
      // this.adsArray.forEach(ele => {
      //   ele.image = `../../assets/uploads/${ele?.image}`;
      // })
      console.log(this.adsArray, "-098");

      this.adsCount = res.countAds;
      this.loader = false;
    }, error => {
      console.log(error, "=========");
    })
  }
  openModal(template: TemplateRef<any>, Id: any) {
    this.modalRef = this.modalService.show(template, this.config);
    this.adsId = Id
  }

  deleteAdsValue() {
    this.httpService.deleteData('deleteAds', this.adsId).subscribe(res => {
      this.toastr.success(res.message);
      this.getAds();
    }, error => {
      console.log(error);
    })

  }

}
