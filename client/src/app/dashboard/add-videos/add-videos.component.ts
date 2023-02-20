import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "src/app/http.service";
import { NgxImageCompressService } from "ngx-image-compress";
import ClassicEditor from "@haifahrul/ckeditor5-build-rich";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: "app-add-videos",
  templateUrl: "./add-videos.component.html",
  styleUrls: [
    "./add-videos.component.scss",
    "../creat-news/creat-news.component.scss",
  ],
})
export class AddVideosComponent implements OnInit {
  public Editor = ClassicEditor;
  selectCate: any;
  selectSubCat: any;
  seleSubSub: any;
  fileVideo: any;
  imagePath: any;
  // showMsg: any;
  imgURL: any;
  singleData: any;
  loader: boolean = false;
  btnLoader: boolean = false;
  paramsId: any;
  categoryArray = [];
  subCatArray = [];
  subSubArray = [];
  selectImg: boolean = false;
  newsForm: FormGroup;
  imageSize: any;
  NatureArray = [];
  selectedNature: any;
  keyWordArray: any = [];
  subCatError: any;
  subSubCatError: any;
  imageFiles: any;
  videoURL: any;
  youTubeLink: any;
  config = {
    removePlugins: ["Title"],
    toolbar: [
      'undo',
      'redo',
      '|',
      'heading',
      'fontFamily',
      'fontSize',
      '|',
      'bold',
      'italic',
      'underline',
      'fontColor',
      'fontBackgroundColor',
      'highlight',
      '|',
      'link',
      '|',
      'alignment',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'insertTable',
      'blockQuote',
      'specialCharacters'
    ],
  }
  errortext: any;
  vedioCode: any;
  youTubeUrl: string;
  // addVideoData: any;
  constructor(private fd: FormBuilder, private toastr: ToastrService, private httpService: HttpService, private activeARouter: ActivatedRoute, private imageCompress: NgxImageCompressService, protected sanitizer: DomSanitizer) {
    this.newsForm = this.fd.group({
      catIndex: ["", Validators.required],
      subCatIndex: [""],
      subSubCatIndex: [""],
      image: [],
      engText: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      title: [''],
      Subtitle: [''],
      newsContext: [],
      keyWord: [],
      youTubePath: []
    });
  }

  ngOnInit(): void {
    this.getNatureNews();
    this.getCategory();
    this.activeARouter.params.subscribe((params) => {
      if (params?.id) {
        this.loader = true;
        this.httpService.getSubCategory('getOneNews', params?.id).subscribe(res => {
          this.singleData = res;
          console.log(this.singleData, "--");
          this.loader = false;
          // if (this.singleData?.keyWords) {
          //   this.keyWordArray = [...JSON.parse(this.singleData?.keyWords)];
          // }
          this.newsForm.patchValue({
            image: this.singleData?.image,
            title: this.singleData?.title,
            Subtitle: this.singleData?.Subtitle,
            newsContext: this.singleData?.news || "",
            imageCap: this.singleData?.imageTitle,
            creatername: this.singleData?.createrName,
            engText: this.singleData?.engTitle,
            keyWord: this.keyWordArray,
            youTubePath: this.singleData?.youTubeLink
          })
          this.singleData?.youTubeLink ? this.youTubeLink = this.sanitizer?.bypassSecurityTrustResourceUrl(this.singleData?.youTubeLink) : '';
          this.videoURL = this.singleData?.image
          // this.singleData?.image ? this.videoURL = `../../assets/uploads/${this.singleData?.image }` : '';
          this.imgURL = this.singleData?.image;
          if (this.singleData?.categoryId) {
            this.categoryArray.forEach((ele, i) => {
              if (ele._id == this.singleData?.categoryId) {
                this.newsForm.patchValue({
                  catIndex: i
                })
              }
            })
          }
          if (this.singleData?.natureId) {
            this.NatureArray.forEach((ele, index) => {
              if (ele?._id == this.singleData?.natureId) {
                this.newsForm.patchValue({
                  natureNews: index
                })
              }
            })
          }
        }
        );
      }
    });

    this.newsForm.get("catIndex").valueChanges.subscribe((values) => {
      this.selectCate = this.categoryArray[values];
      this.subCatArray = [];
      this.subSubArray = [];
      if (this.selectCate?._id) {
        this.httpService
          .getSubCategory("getSubCategory", this.selectCate?._id).subscribe((res) => {
            res.status == 401 ? ((this.subCatError = res.message) && (this.subCatArray = []) && (this.subSubArray = []) && (this.seleSubSub = null)) || (this.selectSubCat = null) : (this.subCatArray = res?.findSubCategory) && (this.subCatError = null);
            if (this.singleData?.subCategoryId) {
              this.subCatArray.forEach((ele, i) => {
                if (ele._id == this.singleData?.subCategoryId) {
                  this.newsForm.patchValue({
                    subCatIndex: i,
                  });
                }
              });
            }
          });
      }
    });
    this.newsForm.get("subCatIndex")?.valueChanges.subscribe((values) => {
      if (this.subCatArray.length != 0) {
        this.selectSubCat = this.subCatArray[values];
      }
      if (this.selectSubCat?._id) {
        this.httpService
          .getSubCategory("paticularSubTwoCat", this.selectSubCat?._id)
          .subscribe((res) => {
            res?.status == 401
              ? (this.subSubCatError = res?.message) &&
              (this.subSubArray = []) &&
              (this.seleSubSub = null)
              : (this.subSubArray = res?.findData) &&
              (this.subSubCatError = null);
            if (this.singleData?.subSubCateId) {
              this.subSubArray.forEach((ele, i) => {
                if (ele._id == this.singleData?.subSubCateId) {
                  this.newsForm.patchValue({
                    subSubCatIndex: i,
                  });
                }
              });
            }
          });
      }
    });
    this.newsForm.get("subSubCatIndex")?.valueChanges.subscribe((value) => {
      if (this.subSubArray.length != 0) {
        this.seleSubSub = this.subSubArray[value];
      }
    });
    this.newsForm.get("natureNews")?.valueChanges.subscribe((value) => {
      this.selectedNature = this.NatureArray[value];
    });
  }
  getCategory() {
    this.httpService.getData("getAllCategory").subscribe((res) => {
      this.categoryArray = res.findAllCategory;
    });
  }
  getNatureNews() {
    this.httpService.getData("getAllNatureNews").subscribe((res) => {
      this.NatureArray = res.findAllNatuNews;
    });
  }
  openImage() {
    this.selectImg = true;
  }
  preview(files: any) {
    this.fileVideo = files[0];
    console.log(this.fileVideo, "--");

    this.imageSize = (this.fileVideo?.size / (1024 * 1024)).toFixed(3);
    if (this.imageSize > 3) {
      alert("your video size more than 3 mb please select less than 3 mb");
      this.videoURL = null;
      this.fileVideo = null;
    } else {
      this.newsForm.patchValue({
        image: this.fileVideo.name,
      });
      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.videoURL = reader.result;
      };
    }
  }
  suppressNonEng(EventKey) {
    if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/.test(EventKey.target.value)
    ) {
      this.toastr.warning("Only Type English Heading");
      this.newsForm.get("engText").setValue("");
    }
  }

  onItemAdded(event: any) {
    this.keyWordArray.push(event.display);
  }
  onItemRemoved(event: any) {
    let changeValue;
    event.display ? (changeValue = event.display) : (changeValue = event);
    this.keyWordArray.splice(this.keyWordArray.indexOf(changeValue), 1);
  }
  videoLink(videoLink: any) {
    // videoLink.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
    this.vedioCode = videoLink.substring(videoLink.indexOf('e/') + 1);
    this.youTubeUrl = `https://www.youtube.com/embed${this.vedioCode}`;
    this.youTubeLink = this.sanitizer?.bypassSecurityTrustResourceUrl(this.youTubeUrl);
    // this.addVideoData.patchValue({
    //   videolink: this.vedioCode
    // })
  }

  sendnNews() {

    this.btnLoader = true;
    const formData = new FormData();
    if (this.fileVideo) {
      formData.append('file', this.fileVideo);
    }
    this.youTubeUrl ? formData.append('youTubeLink', this.youTubeUrl) : "";
    formData.append('newsType', "video");
    if (this.singleData?._id) {
      formData.append("id", this.singleData?._id);
    }
    formData.append('title', this.newsForm.get('title').value || "");
    formData.append('Subtitle', this.newsForm.get('Subtitle').value || "");
    if (this.newsForm.get("engText").value) {
      formData.append("engText", this.newsForm.get("engText").value);
    }
    // formData.append("imageCap", this.newsForm.get("imageCap").value || "");
    // formData.append("creatername", this.newsForm.get("creatername").value || "");
    formData.append("news", this.newsForm.get("newsContext").value || "");
    if (this.selectCate?.categoryName) {
      formData.append("categroyName", this.selectCate?.categoryName);
    }
    if (this.selectCate?._id) {
      formData.append("categoryId", this.selectCate?._id);
    }
    if (this.selectSubCat != null) {
      formData.append("subCategoryName", this.selectSubCat?.name);
    }
    if (this.selectSubCat?.name == null) {
      formData.append("subCategoryName", "");
    }
    if (this.selectSubCat != null) {
      formData.append("subCategoryId", this.selectSubCat?._id);
    }
    if (this.selectSubCat == null) {
      formData.append("subCategoryId", "");
    }
    if (this.seleSubSub != null) {
      formData.append("subSubCateName", this.seleSubSub?.name);
    }
    if (this.seleSubSub == null) {
      formData.append("subSubCateName", "");
    }
    if (this.seleSubSub != null) {
      formData.append("subSubCateId", this.seleSubSub?._id);
    }
    if (this.seleSubSub == null) {
      formData.append("subSubCateId", "");
    }
    // this.selectedNature?._id != undefined ? formData.append("natureid", this.selectedNature?._id) : formData.append("natureid", "")
    // this.selectedNature?.NatureOfNews != undefined ? formData.append("naturename", this.selectedNature?.NatureOfNews) : formData.append("naturename", "")
    // formData.append("keyWord", JSON.stringify(this.keyWordArray));
    this.httpService.addNews("addNews", formData).subscribe(
      (res) => {
        this.btnLoader = false;
        this.toastr.success(res?.message);
        this.clearData();
      },
      (error) => {
        this.errortext = error.error.message;
        this.btnLoader = false;
      }
    );
  }
  clearData() {
    this.imgURL = null;
    this.newsForm.reset();
    // this.newsForm.patchValue({
    //   creatername: "सिद्धि विनायक टाइम्स ब्यूरो",
    // });
    this.youTubeLink = null;
    this.fileVideo = null;
    this.videoURL = null;
    this.subCatError = null;
    this.subSubCatError = null;
    ["catIndex", "subCatIndex", "subSubCatIndex", "natureNews"].forEach((ele) => this.newsForm.get(ele).setValue(""));
  }
}
