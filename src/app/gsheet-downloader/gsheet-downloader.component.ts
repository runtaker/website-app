import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-gsheet-downloader',
  templateUrl: './gsheet-downloader.component.html',
  styleUrls: ['./gsheet-downloader.component.css']
})
@Injectable()
export class GsheetDownloaderComponent implements OnInit {
  contents: string;
  gSheetEndpoint = 'https://spreadsheets.google.com/feeds/cells/1pD1or3qyg-PgT0Q_os-bTKwMr5WfoCY6CZ9AjAcpGqk/2/public/full?alt=json';
  
  constructor(
    private http: HttpClient) { }

  ngOnInit() {
    this.getUrlList();
  }

  getUrlList() {
    return this.http.get(this.gSheetEndpoint)
      .subscribe(
          data => {
            return this.getFormEntry(data);
          },
          error => {
            this.contents = error.toString();
          }
        )
  }

  getFormEntry(rawData: Object) {
  }
}
