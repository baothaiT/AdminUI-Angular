import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Configuration } from './../../Configuration/Configuration';
import { LogInterface } from '../../interfaces/log-interface';

@Injectable({
    providedIn: 'root',
})
export class LogService {
    private apiUrl = Configuration.LogAPI; // Replace with your API endpoint

    constructor(private http: HttpClient) { }

    getLogs(): Observable<LogInterface[]> {
        return this.http.get<LogInterface[]>(this.apiUrl).pipe(
          map((logs) => logs || []),
          catchError((error) => {
            console.error('Error fetching logs:', error);
            throw error;
          })
        );
      }
      
      createLogs(log: LogInterface): Observable<LogInterface> {
        return this.http.post<LogInterface>(this.apiUrl, log).pipe(
          map((createdLog) => createdLog),
          catchError((error) => {
            console.error('Error creating log:', error);
            throw error;
          })
        );
      }

}