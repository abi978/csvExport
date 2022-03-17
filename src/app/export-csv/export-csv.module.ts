import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportCsvRoutingModule } from './export-csv-routing.module';
import { ExportCsvComponent } from './export-csv.component';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [ExportCsvComponent],
  imports: [CommonModule, ExportCsvRoutingModule, SharedModule],
})
export class ExportCsvModule {}
