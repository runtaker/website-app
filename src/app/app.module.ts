import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GsheetDownloaderComponent } from './gsheet-downloader/gsheet-downloader.component';

@NgModule({
  declarations: [
    AppComponent,
    GsheetDownloaderComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
