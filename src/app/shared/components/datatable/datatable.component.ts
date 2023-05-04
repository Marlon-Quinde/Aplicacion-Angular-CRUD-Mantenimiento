
import { Component, EventEmitter, Input, Output, OnInit, KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit{

  //Inputs
  @Input() dataTable: any[] = []
  @Input() nameColums: any[] = []
  @Input() editable: boolean = false
  @Input() delete: boolean = false
  @Input() archives: boolean = false
  @Input() toolbar: boolean = false
  @Input() warning: boolean = false


  //Outputs
  @Output() onModificar: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  //Locales
  loading: boolean = true;
  exportColumns: any[] = [];
  miArregloConClaves: any[] = [];
  cols: any;
  
  constructor(private differs: KeyValueDiffers, private keyValueDiffers: KeyValueDiffers){}

  ngOnInit(): void {
    if(this.dataTable){
      this.loading = false
      
      //this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
      
    }
  }
  
  evento(event:Event){
    return (event.target as HTMLTextAreaElement).value
  }

  clear(table: Table) {
    table.clear();
}


  //Emite la data
  modificardata(item: any){
    this.onModificar.emit(item)
  }

  //Emite la data
  deletedata(item: any){
    this.onDelete.emit(item)
  }

  //Exportar y guardar Pdf
  exportPdf() {
    const doc = new jsPDF({
      orientation: "landscape"
    }
      
    ) 
    const columns = Object.keys(this.dataTable[0]);
    const rows: any[] = [];

    // Recorrer el arreglo de objetos y agregar cada fila a la tabla
    this.dataTable.forEach(obj => {
      const row: any[] = [];
      columns.forEach(column => {
        row.push(obj[column]);
      });
      rows.push(row);
    });
    autoTable(doc, {
      head: [columns],
      body: rows
    })
    doc.save('table.pdf');
  }

  //Exportar Excel
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.dataTable);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'data');
    });
  }

  //Guardar Excel
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
