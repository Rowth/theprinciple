import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
const VIDEO_ROUTE: Routes = [{
    path: '', component: VideosComponent
}]


@NgModule({
    declarations: [
        VideosComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(VIDEO_ROUTE),
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
    ]
})
export class videosModule { }
