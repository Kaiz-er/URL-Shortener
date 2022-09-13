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
    inputLongUrl: new FormControl(``, [Validators.required]),
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
        let longUrl = this.shortenerForm.value.inputLongUrl!;
        const pattern = /^((http|https):\/\/)/;

        // Add http header prefix if does not exist
        if (!pattern.test(longUrl)) {
          longUrl = 'http://' + longUrl;
        }

        this.shortenerService.createShortUrl(longUrl).subscribe({
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
            let errorMsg =
              e.status == 400 ? 'Invalid input!' : 'Something went wrong!';
            this.sendAlert(errorMsg, TuiNotification.Error);
            this.isLoading = false;
          },
        });
      } else {
        console.log('hi');
        console.log(this.shortenerForm.value.inputLongUrl);
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
