import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpService } from 'src/app/http.service';


@Component({
  selector: 'app-footerpage',
  templateUrl: './footerpage.component.html',
  styleUrls: ['./footerpage.component.scss', '../headerpage/headerpage.component.scss']
})
export class FooterpageComponent implements OnInit {
  categoryForm: any;
  categoryArray = [];
  editCat: any;
  counterData: any;
  subCatArray = [];
  SubCatArray = [];
  entertainmentsubcat = [];
  NationalCat = [];
  footerSettin: any
  constructor(private httpService: HttpService, @Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      // this.httpService.getData('getAllCategory').subscribe(res => {
      //   this.categoryArray = res?.findAllCategory;
      //   this.counterData = res?.CategoryCount
      // }, error => {

      //   console.log(error)
      // })
      this.httpService.getSubCategory('getSubCategory', '62d54ba40c584b33d6b50e71').subscribe(res => {
        this.entertainmentsubcat = res.findSubCategory;
      }, error => {
        // console.log(error)
      })
      // this.httpService.getSubCategory('getSubCategory', '62d6580e37380c96b14f19c9').subscribe(res => {
      //   console.log(res,"----");

      //   this.NationalCat = res.findSubCategory
      // }, error => {
      //   console.log(error);
      // })
      this.httpService.ArrayData.subscribe(value => {
        this.NationalCat = value
      })
      this.getCategory();
      // this.httpService.dataStore.subscribe(res => {
      //   this.footerSettin = res?.findData
      // })
      // this.httpService.getData('getAllCategory').subscribe(res => {
      //   this.categoryArray = res?.findAllCategory;
      // }, error => {
      //   console.log(error)
      // })
    }
  }
  getCategory() {
    this.httpService.dataStore.subscribe(value => {
      this.categoryArray = value;
    })
  }

  // getSubCat(id: any) {
  //   this.httpService.getSubCategory('paticularSubTwoCat', id).subscribe(res => {
  //     this.SubCatArray = res.findData;
  //   }, error => {
  //     console.log(error);
  //   })
  // }


  // sendCategory() {
  // let categoryData = {
  //   category: this.categoryForm.get('category')?.value,
  //   id: this.editCat?._id
  // }
  // this.httpService.addData('addCategory', categoryData).subscribe(res => {
  //   // (res.status == 200) ? this.toastr.success('Category Successfully Add') : this.toastr.warning('Something Is Wrong');
  //   // this.toastr.success('Category Successfully Add')

  //   this.getCategory();
  // }, error => {
  //   console.log(error)
  // })

  // this.categoryForm.reset();
  // }

  // getCategory() {
  //   this.httpService.getData('getAllCategory').subscribe(res => {
  //     console.log(res,"---");

  //     this.categoryArray = res?.findAllCategory;
  //     this.counterData = res?.CategoryCount
  //   }, error => {
  //     console.log(error)
  //   })
  // }

  // getSubcat(id){
  //   console.log(id)
  // }
  sendId(cateId: any) {
    let routeData = {
      id: cateId,
    }
    this.httpService.catIdAndData.next(routeData);
  }
  toppositon() { this.httpService.goToTop() }
}
