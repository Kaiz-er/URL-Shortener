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

  ngOnInit(): void {}

  outputUrl = '';
  isLoading = false;

  readonly shortenerForm = new FormGroup({
    inputLongUrl: new FormControl(``, [
      Validators.required,
      Validators.pattern(Constants.URL_REGEX),
    ]),
    outputShortUrl: new FormControl(''),
  });

  onShortenButtonClicked() {
    if (this.shortenerForm.value.outputShortUrl!) {
      this.shortenerForm.patchValue({
        inputLongUrl: '',
        outputShortUrl: '',
      });
    } else {
      if (this.shortenerForm.valid) {
        this.isLoading = true;
        this.shortenerService
          .createShortUrl(this.shortenerForm.value.inputLongUrl!)
          .subscribe({
            next: (res) => {
              this.shortenerForm.patchValue({
                outputShortUrl:
                  environment.endpoint +
                  Constants.URL_MAP_PATH +
                  '/' +
                  res.ShortUrl,
              });
              this.sendAlert('Short URL generated!', TuiNotification.Success);
              this.isLoading = false;
            },
            error: (e) => {
              this.sendAlert('Something went wrong!', TuiNotification.Error);
              this.isLoading = false;
            },
          });
      } else {
        this.sendAlert('Long URL invalid!', TuiNotification.Error);
      }
    }
  }

  sendAlert(message: string, error: TuiNotification) {
    this.alertService
      .open(message, {
        status: error,
      })
      .subscribe();
  }

  onCopyButtonClicked() {
    navigator['clipboard']
      .writeText(this.shortenerForm.value.outputShortUrl!)
      .then(() => {
        this.sendAlert('Short URL copied to clipboard!', TuiNotification.Info);
      })
      .catch((e) => console.error(e));
  }
}
