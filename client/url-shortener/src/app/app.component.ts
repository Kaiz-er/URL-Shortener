import { Component, OnInit, Inject, isDevMode } from '@angular/core';
import {} from '@angular/core';
import { environment } from '../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShortenerService } from './services/shortener.service';
import * as Constants from './helpers/constants';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private shortenerService: ShortenerService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    if (isDevMode()) {
    }
  }

  outputUrl = '';
  isLoading = false;

  readonly shortenerForm = new FormGroup({
    inputLongUrl: new FormControl(``, [
      Validators.required,
      Validators.pattern(Constants.URL_REGEX),
    ]),
    outputShortUrl: new FormControl(''),
  });

  getEndpoint() {}

  onShortenButtonClicked() {
    if (this.shortenerForm.value.outputShortUrl!) {
      this.shortenerForm.patchValue({
        inputLongUrl: '',
        outputShortUrl: '',
      });
    } else {
      console.log(this.shortenerForm.value.inputLongUrl!);
      if (this.shortenerForm.valid) {
        this.isLoading = true;
        this.shortenerService
          .createShortUrl(this.shortenerForm.value.inputLongUrl!)
          .subscribe((res) => {
            this.shortenerForm.patchValue({
              outputShortUrl:
                environment.endpoint +
                Constants.URL_MAP_PATH +
                '/' +
                res.ShortUrl,
            });
            this.isLoading = false;
            this.alertService
              .open('Short URL generated!', {
                status: TuiNotification.Success,
              })
              .subscribe();
          });
      } else {
        this.alertService
          .open('Long URL invalid!', {
            status: TuiNotification.Error,
          })
          .subscribe();
      }
    }
  }

  onCopyButtonClicked() {
    navigator['clipboard']
      .writeText(this.shortenerForm.value.outputShortUrl!)
      .then(() => {
        this.alertService
          .open('Short URL copied to clipboard!', {
            status: TuiNotification.Info,
          })
          .subscribe();
      })
      .catch((e) => console.error(e));
  }
}
