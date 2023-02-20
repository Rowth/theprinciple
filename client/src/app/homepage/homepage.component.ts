import {
  Component,
  Inject,
  OnInit,
  Optional,
  Pipe,
  PLATFORM_ID,
} from "@angular/core";
import { MetadataService } from "../../metadata.service";
import { HttpService } from "src/app/http.service";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { isPlatformBrowser } from "@angular/common";
@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  loader: boolean = true;
  newsArray = [];
  arrayHome = [];
  entertaiment = [];
  sports = [];
  lifestyle = [];
  culture = [];
  astrology = [];
  food = [];
  National = [];
  International = [];
  singleVideo: any;
  startPage = 0;
  limitValue = 15;
  adsArray = [];
  imageUrl: any;
  limtTime: any;
  timer: any;
  timeData: any;
  hours: any;
  seconds: number;
  minutes: number;
  milliSeconds = 100;
  fiterOneArry1 = [];
  fiterOneArry2 = [];
  categoryArray = [];
  imagesAds = [];
  videoAds = [];
  cateWiseArray = [];
  adsArrayData = [];
  orderWise = [];
  videoArray = [];
  constructor(@Optional() private metadataService: MetadataService, private sanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: Object, private activatFormBuilderedroute: ActivatedRoute, private httpService: HttpService) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getNews();
      this.getAds();
      this.videoLoad();
    }
  }
  getNews() {
    this.httpService.getLimitData("getNews", this.limitValue, this.startPage).subscribe((res) => {
      this.arrayHome = res.news1;
      this.cateWiseArray = res.newsArray;
      // this.arrayHome.forEach((ele) => ele.image ? ele.image = `../../assets/uploads/${ele.image}` : ele.image = null);
      // this.cateWiseArray.forEach((ele) => ele.forEach((ele) => ele.image ? ele.image = `../../assets/uploads/${ele.image}` : ele.image = null))
      this.categoryArray = res.cates;
      this.loader = false;
    },
      (error) => {
        console.log(error);
      }
    );
  }
  getAds() {
    this.httpService.getData("getAds").subscribe((res) => {
      this.orderWise = res?.adsData;
      this.adsArrayData = res?.imgAds;
      // this.adsArrayData.forEach(ele => ele.forEach(ele => ele.image = `../../assets/uploads/${ele.image}`))
    },
      (error) => {
        console.log(error);
      }
    );
  }
  goToTop() {
    this.httpService.goToTop();
  }
  isReadMore = true;
  showText() {
    this.isReadMore = !this.isReadMore;
  }

  sendcatdata(catId: any) {
    let routeData = {
      id: catId,
    };
    this.httpService.catIdAndData.next(routeData);
  }
  videoLoad() {
    this.loader = true
    this.httpService.getLimitData('getVideosNews', 1, 0).subscribe(res => {
      this.videoArray = res.videoNews;
      // this.videoArray.forEach((ele) => ele?.image ? ele.image = `../../assets/uploads/${ele.image}` : ele.image = null);
      this.videoArray.forEach((ele) => ele['youTubeUrl'] = this.sanitizer.bypassSecurityTrustResourceUrl(`${ele.youTubeLink}`))
      this.loader = false
    })
  }
}
