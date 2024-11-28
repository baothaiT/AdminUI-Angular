import { Component, OnInit } from '@angular/core';
import { LogService } from './../../shared/services/log/log.service';
import { LogInterface } from '../../shared/interfaces/log-interface';

@Component({
  selector: 'app-Log',
  templateUrl: './Log.component.html',
  styleUrls: ['./Log.component.css']
})
export class LogComponent implements OnInit {
  title = 'Logs';
  logMessage: string = '';
  logLevel: string = 'info';
  response: any;
  logs: LogInterface[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  newLogSuccess: LogInterface = {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Use a UUID or let the backend generate it if needed
    startDateTime: new Date().toISOString(), // Default to the current datetime
    componentName: 'Admin UI',
    code: 200,
    message: 'Success'
  };

  newLogError: LogInterface = {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Use a UUID or let the backend generate it if needed
    startDateTime: new Date().toISOString(), // Default to the current datetime
    componentName: 'Admin UI',
    code: 404,
    message: 'Not Found'
  };

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.logService.getLogs().subscribe({
      next: (logs: LogInterface[]) => {
        this.logs = logs;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load logs. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  submitLog(data: any): void {
    this.successMessage = null;
    this.errorMessage = null;
    this.logService.createLogs(data).subscribe({
      next: (createdLog) => {
        // this.successMessage = `Log created successfully with ID: ${createdLog.id}`;
        this.fetchLogs();
      },
      error: (error) => {
        this.errorMessage = 'Failed to create log. Please try again.';
        console.error(error);
      }
    });
  }

}
