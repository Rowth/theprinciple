import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EpaperComponent } from './epaper.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
const EPAPER_ROUTE: Routes = [{
    path: '', component: EpaperComponent
}]


@NgModule({
    declarations: [
        EpaperComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(EPAPER_ROUTE),
        ReactiveFormsModule,
        FormsModule,
        PdfViewerModule,
        NgxPaginationModule,

    ]
})
export class epaperModule { }
