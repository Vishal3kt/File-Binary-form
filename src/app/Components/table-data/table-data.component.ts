import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit, AfterViewInit {
  data: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'file', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.fetchData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      console.log(this.data);
    }, (error: any) => {
      console.error('Error fetching data:', error);
    })
  }

  downloadFile(id: string) {
    this.api.getFile(id).subscribe(() => {
      console.log('File downloaded successfully.');
    }, (error) => {
      console.error('Error downloading file:', error);
    });
  }

  toggle() {
    this.router.navigate(['/form']);
  }

}
