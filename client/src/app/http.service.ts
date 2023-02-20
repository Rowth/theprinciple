import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  getNewsId(arg0: string, params: any) {
    throw new Error('Method not implemented.');
  }
  toggle$: Observable<any>;

  private toggleSource = new Subject<boolean>();
  profileData: any;
  searchArray = [];
  catdata: any;
  playLiatId = "AIzaSyCa2XE1M1w-2-FgA354m1BuH9LBt_d9gPk";
  dataStore = new BehaviorSubject<any>([]);
  searchStore = new BehaviorSubject<any>([]);
  searchValue = new BehaviorSubject<any>([]);
  ArrayData = new BehaviorSubject<any>([]);
  catIdAndData = new BehaviorSubject<any>([]);
  contactdata = new BehaviorSubject<any>([]);
  timeDataArray = new ReplaySubject<any>(5);
  paramsObject: any;
  getBaseUrl() {
    // if (environment.production) {
    //   console.log('if========');

    //   return 'https://theprinciplelive.com/api'
    // } else {
    return "https://theprinciplelive.com/api";
    //   console.log('else');
   // return "http://localhost:9000/api";
    // }

  }
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.toggle$ = this.toggleSource.asObservable();
  }
  addData(url: any, data: any): Observable<any> {
    try {
      return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data);
    } catch (error) {
      return error;
    }
  }
  updateData(url: any, data: any): Observable<any> {
    try {
      return this.httpClient.put(`${this.getBaseUrl()}/${url}`, data);
    } catch (error) {
      return error;
    }
  }

  Register(url: any, data: any): Observable<any> {
    try {
      return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data);
    } catch (error) {
      return error;
    }
  }
  getData(url: any): Observable<any> {
    try {
      return this.httpClient.get(`${this.getBaseUrl()}/${url}`);
    } catch (error) {
      return error;
    }
  }
  deleteData(url: any, id: any): Observable<any> {
    try {
      return this.httpClient.delete(`${this.getBaseUrl()}/${url}/${id}`);
    } catch (error) {
      return error;
    }
  }

  addSubCategory(url: any, data: any): Observable<any> {
    try {
      return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data);
    } catch (error) {
      return error;
    }
  }
  forgetPswd(url: any, data: any): Observable<any> {
    try {
      return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data);
    } catch (error) {
      return error;
    }
  }

  getSubCategory(url: any, id: any): Observable<any> {
    try {
      return this.httpClient.get(`${this.getBaseUrl()}/${url}/?id=${id}`);
    } catch (error) {
      return error;
    }
  }
  getSubCategorybyName(url: any, catName: any, status: any): Observable<any> {
    try {
      return this.httpClient.get(`${this.getBaseUrl()}/${url}/?id=${catName}&type=${status}`);
    } catch (error) {
      return error;
    }
  }
  getLimitValue(url: any, id: any, limitValue: any, pageSize: any): Observable<any> {
    try {
      return this.httpClient.get(`${this.getBaseUrl()}/${url}/?id=${id}&limit=${limitValue}&page=${pageSize}`);
    } catch (error) {
      return error;
    }
  }
  addNews(url: any, data): Observable<any> {
    try {
      return this.httpClient.post(`${this.getBaseUrl()}/${url}`, data);
    } catch (error) {
      return error;
    }
  }
  categoryGet(url: any, id: any, name: any, limit: any, page: any) {
    try {
      return this.httpClient.get(
        `${this.getBaseUrl()}/${url}/?id=${id}&name=${name}&limit=${limit}&page=${page}`
      );
    } catch (error) {
      return error;
    }
  }
  searchData(data: any) {
    this.searchArray = data;
  }

  getLimitData(url: any, limit: any, page: any) {
    try {
      return this.httpClient.get(`${this.getBaseUrl()}/${url}/${limit}/${page}`);
    } catch (error) {
      return error;
    }
  }
  onlyUrlPass(url: any) {
    try {
      return this.httpClient.get(`${this.getBaseUrl()}/${url}`);
    } catch (error) {
      return error;
    }
  }
  goToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  toggleNavbar(value) {
    this.toggleSource.next(value);
  }
}
