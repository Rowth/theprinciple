import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss', '../news-list/news-list.component.scss', '../user/user.component.scss']
})
export class VideosListComponent implements OnInit {
  startPage = 0;
  limitValue = 10;
  videoArray = [];
  totalVideoNews: any;
  loader: boolean = false;
  modalRef: any;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  };
  oneVde: any;
  constructor(private modalService: BsModalService, private httpService: HttpService, protected sanitizer: DomSanitizer, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getVideosNewsData(this.startPage)
  }
  getVideosNewsData(page) {
    this.loader = true
    this.httpService.getLimitData('getVideosNews', this.limitValue, page).subscribe(res => {
      this.totalVideoNews = res.videosTotalNews
      this.videoArray = res.videoNews;
      this.videoArray.forEach((ele, index) => ele['youTubeUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(`${ele.youTubeLink}`))
      this.totalVideoNews = res.videosTotalNews;
      this.loader = false
    })
  }
  loadPage(pageNo: any) {
    this.startPage = pageNo;
    this.getVideosNewsData(this.startPage - 1);
  }
  openModal(template: TemplateRef<any>, vdeId): any {
    this.modalRef = this.modalService.show(template, this.config);
    this.oneVde = vdeId;
  }
  delVdeNs() {
    this.httpService.deleteData('deleteNews', this.oneVde).subscribe(res => {
      res?.status == 200 ? this.toastr.success("Successfully delete Video News") && (this.modalRef.hide(), this.getVideosNewsData(this.startPage),this.videoArray=[]) : '';
    }, error => {
      console.log(error);
    })
  }

}
