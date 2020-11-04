import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gsheet-downloader',
  templateUrl: './gsheet-downloader.component.html',
  styleUrls: ['./gsheet-downloader.component.css']
})
@Injectable()
export class GsheetDownloaderComponent implements OnInit {
  
  NO_OF_COLS = 7;
  
  contents: string;
  formRowsArray = [];
  
  gSheetEndpoint = 'https://spreadsheets.google.com/feeds/cells/1pD1or3qyg-PgT0Q_os-bTKwMr5WfoCY6CZ9AjAcpGqk/2/public/full?alt=json';
  
  constructor(
    private http: HttpClient) { 
      this.buildFormRowsArray();
      this.ngOnInit();
    }

  ngOnInit() {
    
  }

  buildFormRowsArray() {
    return this.http.get(this.gSheetEndpoint)
      .subscribe(
          data => {
            this.formRowsArray = this.getFormEntryArray(this.getJsonResponse(data).feed.entry);
          },
          error => {
            this.contents = error.toString();
          }
        )
  }

  getJsonResponse(rawData: Object) {
    let JsonString = JSON.stringify(rawData);
    return <JSONResponse>JSON.parse(JsonString);
  }

  getFormEntryArray(dataValueArr: DataValue[]) {
    let currRow = 2;
    var formEntry = new FormEntry();
    var formEntries = [];

    dataValueArr.forEach(dataValue => {
      
      //Ignore header row
      if(dataValue.gs$cell.row == 1) {
        return;
      }

      //If new row, save previous FormEntry object, reinitialize formEntry object, update current row value
      if(dataValue.gs$cell.row > currRow) {
        formEntries[currRow-2] = formEntry;
        formEntry = new FormEntry();
        currRow = dataValue.gs$cell.row;
      }
      switch(dataValue.gs$cell.col % this.NO_OF_COLS) {
        case 1: {
          formEntry.timeStamp = dataValue.content.$t;
          break;
        }
        case 2: {
          formEntry.submitter = dataValue.content.$t;
          break;
        }
        case 3: {
          formEntry.countryCode = dataValue.content.$t;
          break;
        }
        case 4: {
          formEntry.phrase = dataValue.content.$t;
          break;
        }
        case 5: {
          formEntry.imageUrl = dataValue.content.$t;
          break;
        }
        case 6: {
          formEntry.comments = dataValue.content.$t;
          break;
        }
        case 0: {
          formEntry.jsonResponse = dataValue.content.$t;
          break;
        }
        default: {
          break;
        }
      }
    });
    formEntries[currRow-2] = formEntry;
    return formEntries;
  }
}


export interface JSONResponse {
  feed: Feed
}
export interface Feed {
  entry: DataValue[]
}
export interface DataValue {
  content: Content
  gs$cell: CellData
}
export interface Content {
  type: string,
  $t: string
}
export interface CellData {
  row: number,
  col: number
}
export class FormEntry {
  timeStamp: string
  submitter: string
  countryCode: string
  phrase: string
  imageUrl: string
  comments: string
  jsonResponse: string
}
