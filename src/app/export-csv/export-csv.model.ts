export interface storeData {
  storeName: string;
  totalSales: string;
  totalStock: string;
  details: [
    {
      department: string;
      stock: string;
      sales: string;
    }
  ];
}
