import { Component, OnInit, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MetadataService } from 'src/metadata.service';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss', '../../app/category-news/category-news.component.scss']
})
export class VideosComponent implements OnInit {
  videoArray = [];
  limitValue = 9;
  loader: boolean = true;
  startPage = 0
  nextPage: any;
  prevPage: any;
  totalVideoNews: any;
  constructor(@Optional() private metadataService: MetadataService, private sanitizer: DomSanitizer, private activatedroute: ActivatedRoute, private httpService: HttpService,) { }

  ngOnInit(): void {
    this.getVideosNewsData(this.startPage)
  }
  getVideosNewsData(page) {
    this.loader = true
    this.httpService.getLimitData('getVideosNews', this.limitValue, page).subscribe(res => {
      this.videoArray = res.videoNews;
      // this.videoArray.forEach((ele) => { ele?.image ? ele.image = `../../assets/uploads/${ele.image}` : ele.image = null });
      this.videoArray.forEach((ele, index) => ele['youTubeUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(`${ele.youTubeLink}`))
      this.totalVideoNews = res.videosTotalNews;
      this.loader = false
    })
  }
  loadPage(pageNo: any) {
    this.startPage = pageNo;
    this.getVideosNewsData(this.startPage - 1);
  }


}
