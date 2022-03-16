import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EndPointService } from '../config/end-point';
import { HttpService } from '../service/http/http.service';

@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrls: ['./export-csv.component.scss'],
})
export class ExportCsvComponent implements OnInit {
  constructor(private methods: HttpService) {}

  tableData: any = [];

  ngOnInit(): void {
    this.methods
      .get(EndPointService.getDataApi, 'text')
      .subscribe((res: any) => {
        this.tableData = JSON.parse(res);
      });
  }
}
