import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CsvDownloadService {
  constructor(private toast: ToastrService) {}
  // creates a new csv file using "a" tag
  public exportAsCsvFile(json: any, fileName: any, csvHeadder: string): void {
    var exportedFilename = fileName + '.csv';
    var csv = this.convertToCSVFormat(json, csvHeadder);
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    var url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', exportedFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.toast.success('CSV Exported Succesfully');
  }

  // **

  // converts JSON to CSV format
  private convertToCSVFormat(toConvertData: any, headder: string) {
    var data = headder + '';
    for (var i = 0; i < toConvertData.length; i++) {
      var line = '';
      for (var index in toConvertData[i]) {
        if (line != '') line += ',';
        line += toConvertData[i][index];
      }
      data += line + '\r\n';
    }
    return data;
  }
  // **
}
