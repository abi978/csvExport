import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CsvDownloadService {
  constructor(private toast: ToastrService) {}
  // JSON to CSV conversion
  public exportAsCsvFile(json: any, excelFileName: any): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'store data');
    XLSX.writeFile(wb, excelFileName + '.ods');
    this.toast.success('Excel Exported Succesfully');
  }
  // **
}
