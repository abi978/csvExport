import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportCsvRoutingModule } from './export-csv-routing.module';
import { ExportCsvComponent } from './export-csv.component';


@NgModule({
  declarations: [ExportCsvComponent],
  imports: [
    CommonModule,
    ExportCsvRoutingModule
  ]
})
export class ExportCsvModule { }
