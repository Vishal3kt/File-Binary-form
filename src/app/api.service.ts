import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://localhost:8080/employee';
  // http://localhost:8080/employee?pageNumber=1&pageSize=5

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl)
  }

  getPaginationData(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  addData(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteRow(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  editRow(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${data.id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
