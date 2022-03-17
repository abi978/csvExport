import { Component, OnInit, ViewChild } from '@angular/core';
import { EndPointService } from '../config/end-point';
import { HttpService } from '../service/http/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { CsvDownloadService } from '../service/csv/csv-download.service';
import { DatePipe } from '@angular/common';
import { storeData } from './export-csv.model';

@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrls: ['./export-csv.component.scss'],
})
export class ExportCsvComponent implements OnInit {
  constructor(
    private methods: HttpService,
    private toast: ToastrService,
    private csvExport: CsvDownloadService,
    private datePipe: DatePipe
  ) {}

  tableData: any = [];
  tableDataApiRes: any = [];
  pagelength: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['storeName', 'department', 'stock', 'sales'];

  ngOnInit(): void {
    this.getTableData();
  }

  // table data
  private getTableData() {
    this.methods
      .get(EndPointService.getDataApi)
      .subscribe((apiResponse: storeData) => {
        this.tableDataApiRes = apiResponse;
        this.getTableDataStructure(this.tableDataApiRes);
      });
  }
  // **

  // converts the api response to required structure for table view and csv conversion
  private getTableDataStructure(res: any): void {
    // assigning the details to response
    this.tableDataApiRes.map((response: any) => {
      response.details.map((detailsResponse: any) => {
        return (
          (detailsResponse.storeName = response.storeName),
          (detailsResponse.totalStock = response.totalStock),
          (detailsResponse.totalSales = response.totalSales)
        );
      });
    });
    // response is converted as objects for table view
    let tableData: any = [];
    this.tableDataApiRes.map((tableRes: any) => {
      tableRes.details.map((tableRes1: any) => {
        tableData.push(tableRes1);
      });
    });
    this.bindTableData(tableData);
  }
  // **

  // function to export table data as CSV file
  public exportToCsv(): void {
    const exportData: any = [];
    if (this.tableDataApiRes.length == 0) {
      this.toast.info('Table is empty');
    } else if (this.tableDataApiRes.length > 0) {
      for (let item of this.tableDataApiRes) {
        for (let details of item.details) {
          var detail: any = {
            Name: item.storeName,
            Department: details.department,
            No_of_items: details.stock,
            No_of_sales: details.sales,
          };
          exportData.push(detail);
        }

        var total: any = {
          // name field is kept empty since name is not needen in excel for total
          Name: '',
          Department: 'Total',
          No_of_items: item.totalStock,
          No_of_sales: item.totalSales,
        };
        exportData.push(total);
      }
      // today date is used as file name
      let today = this.transformData(new Date()) + '_store_data';

      this.csvExport.exportAsCsvFile(exportData, today);
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
    this.dataSource.sort = this.sort;
    if (this.dataSource.filteredData.length == 0) {
      this.toast.info('No Data Found');
    }
  }
  // **
}
