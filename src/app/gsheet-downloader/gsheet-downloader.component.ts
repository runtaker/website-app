import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gsheet-downloader',
  templateUrl: './gsheet-downloader.component.html',
  styleUrls: ['./gsheet-downloader.component.css']
})
@Injectable()
export class GsheetDownloaderComponent {
  
  NO_OF_COLS = 7;
  FIRST_ROW_TO_READ_FROM = 3;
  
  contents: string;
  formRowsArray = [];
  
  gSheetEndpoint = 'https://spreadsheets.google.com/feeds/cells/1pD1or3qyg-PgT0Q_os-bTKwMr5WfoCY6CZ9AjAcpGqk/3/public/full?alt=json';
  
  constructor(
    private http: HttpClient) { 
      this.buildFormRowsArray();
    }

  buildFormRowsArray() {
    return this.http.get(this.gSheetEndpoint)
      .subscribe(
          (data: JSONResponse) => {
            let rawData: JSONResponse = {... data};
            this.formRowsArray = this.getFormEntryArray(rawData.feed.entry);
          },
          error => {
            this.contents = error.toString();
          }
        )
  }

  getFormEntryArray(dataValueArr: DataValue[]) {
    let currRow = this.FIRST_ROW_TO_READ_FROM;
    var formEntry = new FormEntry();
    var formEntries = [];

    dataValueArr.forEach(dataValue => {
      let dataValueRow: number = +dataValue.gs$cell.row;

      //Ignore header row
      if(dataValueRow < this.FIRST_ROW_TO_READ_FROM) {
        return;
      }

      //If new row, save previous FormEntry object, reinitialize formEntry object, update current row value
      if(dataValue.gs$cell.row > currRow) {
        formEntries[currRow-this.FIRST_ROW_TO_READ_FROM] = formEntry;
        formEntry = new FormEntry();
        currRow = dataValueRow;
      }
      switch(dataValue.gs$cell.col % this.NO_OF_COLS) {
        case 1: {
          formEntry.timeStamp = dataValue.content.$t;
          break;
        }
        case 2: {
          formEntry.countryCode = dataValue.content.$t;
          break;
        }
        case 3: {
          formEntry.phrase = dataValue.content.$t;
          break;
        }
        case 4: {
          formEntry.imageUrl = dataValue.content.$t;
          break;
        }
        case 5: {
          formEntry.occurrences = dataValue.content.$t;
          break;
        }
        case 6: {
          formEntry.percent = dataValue.content.$t;
          break;
        }
        case 0: {
          formEntry.notes = dataValue.content.$t;
          break;
        }
        default: {
          break;
        }
      }
    });
    formEntries[currRow-this.FIRST_ROW_TO_READ_FROM] = formEntry;
    return formEntries;
  }
}

export class FormEntry {
  timeStamp: string
  countryCode: string
  phrase: string
  imageUrl: string
  occurrences: string
  percent: string
  notes: string
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