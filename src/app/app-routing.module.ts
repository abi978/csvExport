import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // lazy loading module is imported to seperate the csv file export
  {
    path: '',
    loadChildren: () =>
      import(`./export-csv/export-csv.module`).then((m) => m.ExportCsvModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
