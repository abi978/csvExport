import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EndPointService } from '../config/end-point';
import { HttpService } from '../service/http/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CsvDownloadService } from '../service/csv/csv-download.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrls: ['./export-csv.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class ExportCsvComponent implements OnInit {
  constructor(
    private methods: HttpService,
    private toast: ToastrService,
    private csvExport: CsvDownloadService,
    private datePipe: DatePipe
  ) {}

  tableData: any = [];
  showNextView: boolean = false;
  pagelength: any;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['storeName', 'department', 'stock', 'sales'];

  ngOnInit(): void {
    this.getData();
  }

  // data from API
  private getData() {
    this.methods.get(EndPointService.getDataApi).subscribe(
      (apiResponse: any) => {
        this.bindTableData(apiResponse);
      },
      (error: any) => {
        this.toast.error(error.error);
      }
    );
  }
  // **

  // function to export table data as CSV file
  public exportToCsv(data: Array<any>): void {
    const exportData: any = [];
    if (data.length == 0) {
      this.toast.info('Table is empty');
    } else if (data.length > 0) {
      for (let item of data) {
        var detail: any = {
          film_name: item.name || 'N/A',
          actor: item.actor || 'N/A',
          gender: item.gender || 'N/A',
          dob: item.dateOfBirth || 'N/A',
        };
        exportData.push(detail);
      }
      // today date is used as file name
      let today = this.transformData(new Date()) + '_store_data';
      let headding = 'Film Name,Actor Name,Gender,DOB' + '\r\n';
      this.csvExport.exportAsCsvFile(exportData, today, headding);
    } else {
      this.toast.info('Error in exporting excel');
    }
  }

  // **

  // date transform is uses to format new date for file name
  private transformData(today: Date): any {
    return this.datePipe.transform(today, 'dd-MM-yyyy');
  }
  // **

  // assigining mat-table data is kept as a seperate function to use globally in this ts
  private bindTableData(res: any) {
    this.tableData = res;
    this.pagelength = res.length;
    this.dataSource = new MatTableDataSource<any>(this.tableData);
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.filteredData.length == 0) {
      this.toast.info('No Data Found');
    }
  }
  // **
}
