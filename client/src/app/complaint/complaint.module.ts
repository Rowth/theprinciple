import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComplaintComponent } from './complaint.component';
const EPAPER_ROUTE: Routes = [{
    path: '', component: ComplaintComponent
}]


@NgModule({
    declarations: [
        ComplaintComponent
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
export class complaintModule { }
