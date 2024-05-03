import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DailogDeleteComponent } from '../dailog-delete/dailog-delete.component';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit, AfterViewInit {
  data: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'file', 'action'];
  dataSource: MatTableDataSource<any>;
  png: any = 'jpg';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, private sanitizer: DomSanitizer, private router: Router, private dailog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(rowId: string): void {
    if (!rowId) {
      return;
    }
    const dialogRef = this.dailog.open(DailogDeleteComponent, {
      width: '350px',
      data: { rowId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeRow(rowId);
      } else {
        console.log('Not deleted.');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchData() {
    this.api.getData().subscribe((res: any) => {
      this.dataSource.data = res;
      console.log(res);
      // this.fetchPaginationData(1, 5);
      console.log(this.fetchPaginationData(1, 5));
      // console.log(this.data);
    }, (error: any) => {
      console.error('Error fetching data:', error);
    })
  }

  fetchPaginationData(pageNumber: number, pageSize: number) {
    this.api.getPaginationData(pageNumber, pageSize).subscribe(
      (res: any) => {
        this.dataSource.data = res.content;
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error('Error fetching pagination data:', error);
      }
    );
  }

  removeRow(id: string) {
    this.api.deleteRow(id).subscribe(
      (res) => {
        console.log(res);
        this.dataSource.data = this.dataSource.data.filter((row: any) => row.id !== id);
      },
      (error) => {
        console.error('Error deleting row:', error);
      }
    );
  }

  editRow(row: any) {
    this.router.navigate(['/form'], { state: { row } });
  }


  toggle() {
    this.router.navigate(['/form']);
  }

}
