import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-epaper',
  templateUrl: './epaper.component.html',
  styleUrls: ['./epaper.component.scss', '../../app/videos/videos.component.scss', '../../app/category-news/category-news.component.scss']
})
export class EpaperComponent implements OnInit {
  loader: boolean;
  pdfArray: any;
  totalPdfNews: any;
  startPage = 0;
  limitValue = 10;
  modalRef: any;
  pageVariable: any = 1;
  zoomNumber: any = 0.9;
  onePdfData: any;
  config: {
    keyboard: true,
    dropdown: true,
    ignoreBackdropClick: true,
    id: 1,
  }
  totalPages: number;
  constructor(private modalService: BsModalService, private httpService: HttpService, protected sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.getPdfNewsData(this.startPage)
  }
  openModal(template: TemplateRef<any>, i: any) {
    this.onePdfData = this.pdfArray[i];
    this.modalRef = this.modalService.show(template, Object.assign({}, this.config, { class: 'modal-lg' }));
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

}
