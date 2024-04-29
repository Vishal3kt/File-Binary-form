import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {
  data: any;

  constructor(private api: ApiService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.api.getData().subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
    }, (error: any) => {
      console.error('Error fetching data:', error);
    })
  }

  toggle() {
    this.router.navigate(['/form']);
  }
}
