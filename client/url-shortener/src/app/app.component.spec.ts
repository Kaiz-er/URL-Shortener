import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  TuiHintsHostComponent,
  TuiHostedDropdownComponent,
  TuiLoaderComponent,
  TuiPrimitiveTextfieldComponent,
  TuiRootComponent,
  TuiSvgDefsHostComponent,
  TuiValueDecorationComponent,
} from '@taiga-ui/core';
import { TuiInputComponent, TuiIslandComponent } from '@taiga-ui/kit';
import {
  TuiAlertHostComponent,
  TuiDialogHostComponent,
  TuiDropdownHostComponent,
} from '@taiga-ui/cdk';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TuiRootComponent,
        TuiIslandComponent,
        TuiLoaderComponent,
        TuiInputComponent,
        TuiPrimitiveTextfieldComponent,
        TuiHostedDropdownComponent,
        TuiHintsHostComponent,
        TuiAlertHostComponent,
        TuiDialogHostComponent,
        TuiDropdownHostComponent,
        TuiSvgDefsHostComponent,
        TuiValueDecorationComponent,
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
