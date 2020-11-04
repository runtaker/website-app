import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GsheetDownloaderComponent } from './gsheet-downloader.component';

describe('GsheetDownloaderComponent', () => {
  let component: GsheetDownloaderComponent;
  let fixture: ComponentFixture<GsheetDownloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GsheetDownloaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GsheetDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
