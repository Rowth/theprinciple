import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-add-epaper',
  templateUrl: './add-epaper.component.html',
  styleUrls: ['./add-epaper.component.scss', '../creat-news/creat-news.component.scss',]
})
export class AddEpaperComponent implements OnInit {
  categoryArray = [];
  filePdf: any;
  addPdfData: any;
  pdfNewsForm: FormGroup
  selectSubCate: any;
  btnLoader: boolean = false;
  patchData: any;
  pdfName = null;
  pdfSize: any;
  constructor(private fd: FormBuilder, private toastr: ToastrService, private httpService: HttpService, private activeARouter: ActivatedRoute) {
    this.pdfNewsForm = this.fd.group({
      catIndex: ['', Validators.required],
      title: [''],
      pdf: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.httpService.onlyUrlPass('sendStatesCat').subscribe(res => {
      this.categoryArray = res.stateSubCat;
    })
    this.activeARouter.params.subscribe(params => {
      if (params.id) {
        this.httpService.getSubCategory('getOneNews', params.id).subscribe(res => {
          this.patchData = res;
          this.categoryArray.forEach((ele, i) => ele._id == this.patchData.subCategoryId ? this.pdfNewsForm.patchValue({ catIndex: i }) : '')
          this.pdfNewsForm.patchValue({
            title: this.patchData?.title,
            pdf: this.patchData?.image,
          })
          this.pdfName = this.patchData?.image
        })
      }
    })
    this.pdfNewsForm.get("catIndex").valueChanges.subscribe((values) => {
      this.selectSubCate = this.categoryArray[values];
    });
  }
  preview(files: any) {
    this.filePdf = files[0];
    this.pdfSize = (this.filePdf?.size / (1024 * 1024)).toFixed(3);
    if (this.pdfSize >=10) {
      alert("your Pdf size is more than 10 mb please select less than 10 mb");
      this.filePdf = null;
      this.pdfNewsForm.patchValue({
        pdf: '',
      });
    } else {
      this.pdfNewsForm.patchValue({
        pdf: this.filePdf.name,
      });
    }
    // this.pdfNewsForm.patchValue({ pdf: this.filePdf.name })
  }
  sendPdfNews() {
    this.btnLoader = true;
    const formData = new FormData();
    if (this.filePdf) {
      formData.append('file', this.filePdf);
    }
    this.patchData?._id ? formData.append("id", this.patchData?._id) : "";
    formData.append("newsType", "pdfNews");
    this.pdfNewsForm.get('title')?.value ? formData.append("title", this.pdfNewsForm.get('title')?.value) : "";
    if (this.selectSubCate?.category) {
      formData.append("categroyName", this.selectSubCate?.category);
    }
    if (this.selectSubCate?.categoryId) {
      formData.append("categoryId", this.selectSubCate?.categoryId);
    }
    if (this.selectSubCate?.category) {
      formData.append("subCategoryName", this.selectSubCate?.name);
    }
    if (this.selectSubCate?._id) {
      formData.append("subCategoryId", this.selectSubCate?._id);
    }
    this.httpService.addNews("addNews", formData).subscribe((res) => {
      this.btnLoader = false;
      this.toastr.success(res?.message);
      this.clearData();
    },
      (error) => {
        // this.errortext = error.error.message;
        this.btnLoader = false;
      }
    );
  }
  clearData() { ['catIndex', 'title'].forEach((ele) => this.pdfNewsForm.get(ele).setValue("")) }

}
