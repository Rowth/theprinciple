import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';


@Component({
  selector: 'app-epaper-list',
  templateUrl: './epaper-list.component.html',
  styleUrls: ['./epaper-list.component.scss', '../news-list/news-list.component.scss', '../user/user.component.scss', '../../../app/epaper/epaper.component.scss']
})
export class EpaperListComponent implements OnInit {
  modalRef: any;
  loader: boolean;
  pdfArray: any;
  totalPdfNews: any;
  startPage = 0;
  limitValue = 10;
  pageVariable: any = 1;
  zoomNumber: any = 0.9;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1
  }
  onePdfData: any;
  totalPages: number;
  constructor(private modalService: BsModalService, private httpService: HttpService, protected sanitizer: DomSanitizer, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPdfNewsData(this.startPage)
  }
  openModal(template: TemplateRef<any>, i: any) {
    this.onePdfData = this.pdfArray[i];
    this.modalRef = this.modalService.show(template, Object.assign({},
      this.config, { class: 'modal-lg' }));
  }
  deleteNewss(NewsId: any) {
    console.log(NewsId, "NewsId");
    this.httpService.deleteData('deleteNews', NewsId).subscribe(res => {
      res.status == 200 ? this.toastr.success(res?.message) && (this.modalRef.hide(), this.getPdfNewsData(this.startPage)) : this.toastr.warning('Something is Wrong')
    }, error => { this.toastr.warning('Something is Wrong') })
  }
  getPdfNewsData(page) {
    this.loader = true
    this.httpService.getLimitData('getPdfNews', this.limitValue, page).subscribe(res => {
      this.pdfArray = res.pdfNews;
      this.totalPdfNews = res.pdfTotalNews
      this.loader = false
    })
  }
  loadPage(pageNo: any) {
    this.startPage = pageNo;
    this.getPdfNewsData(this.startPage - 1);
  }
  afterLoadComplete(pdfPages: any) {
    this.totalPages = pdfPages.numPages;
    console.log(this.totalPages, "---pages");

  }
  increaseNum() {
    this.pageVariable = this.pageVariable + 1;
    this.zoomNumber = 0.9;
  }
  decreaseNum() {
    this.pageVariable = this.pageVariable - 1;
    this.zoomNumber = 0.9;
  }
  refresh() {
    this.pageVariable = 1;
    this.zoomNumber = 0.9;
  }
  zoom() {
    if (this.zoomNumber == 3.4) {
      this.zoomNumber = this.zoomNumber - 2.5;
    } else {
      this.zoomNumber = this.zoomNumber + 0.5;
    }
  }
}
