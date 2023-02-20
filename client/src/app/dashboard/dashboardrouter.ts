import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashRouterComponent } from './dashLayout/dash-router/dash-router.component';
import { CreatNewsComponent } from './creat-news/creat-news.component';
import { UserComponent } from './user/user.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SubCategoryPageComponent } from './sub-category-page/sub-category-page.component';
import { SubSubPageComponent } from './sub-sub-page/sub-sub-page.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ReadNewsComponent } from './read-news/read-news.component';
import { SettingComponent } from './setting/setting.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AdsListComponent } from './ads-list/ads-list.component';
import { NatureNewsComponent } from './nature-news/nature-news.component';
import { DasbordPageComponent } from './dasbord-page/dasbord-page.component';
import { AdsAddComponent } from './ads-add/ads-add.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { AddVideosComponent } from './add-videos/add-videos.component';
import { VideosListComponent } from './videos-list/videos-list.component';
import { AddEpaperComponent } from './add-epaper/add-epaper.component';
import { EpaperListComponent } from './epaper-list/epaper-list.component';
import { ComplaintlistComponent } from './complaintlist/complaintlist.component';
import { ReadComplaintComponent } from './read-complaint/read-complaint.component';





const routes: Routes = [
  {
    path: "",
    component: DashRouterComponent,

    children: [
      {
        path: "addnews",
        component: CreatNewsComponent,
      },
      {
        path: "addnews/:id",
        component: CreatNewsComponent,
      },
      {
        path: "addNewsList",
        component: NewsListComponent,
      },
      {
        path: "readNews/:id",
        component: ReadNewsComponent,
      },
      {
        path: "UserPanel",
        component: UserComponent,
      },
      {
        path: 'category',
        component: CategoryPageComponent
      },
      {
        path: 'subCategory',
        component: SubCategoryPageComponent
      },
      {
        path: 'subSubCategory',
        component: SubSubPageComponent
      },
      {
        path: 'advertisement',
        component: AdvertisementComponent
      },
      {
        path: 'Setting',
        component: SettingComponent
      },
      {
        path: 'nautreNews',
        component: NatureNewsComponent
      },
      {
        path: 'advertisement/:id',
        component: AdvertisementComponent
      },
      {
        path: 'advertisement-List',
        component: AdsListComponent
      },

      {
        path: 'dasbord-page',
        component: DasbordPageComponent
      },
      {
        path: 'contact-details',
        component: ContactDetailsComponent
      },
      {
        path: 'ads',
        component: AdsAddComponent
      },
      {
        path: 'ads/:id',
        component: AdsAddComponent
      },
      {
        path: 'addVideos',
        component: AddVideosComponent
      },
      {
        path: 'addVideos/:id',
        component: AddVideosComponent
      },
      {
        path: 'allVideosList',
        component: VideosListComponent
      },
      {
        path: 'addEpaper',
        component: AddEpaperComponent
      },
      {
        path: 'addEpaper/:id',
        component: AddEpaperComponent
      },
      {
        path: 'allEpaperList',
        component: EpaperListComponent
      },
      {
        path: 'allComplaintsList',
        component: ComplaintlistComponent
      },
      {
        path: 'viewComplaintReport/:id',
        component: ReadComplaintComponent
      },
    ],
  },
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dashboardRouting { }



