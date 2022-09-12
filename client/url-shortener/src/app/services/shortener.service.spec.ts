// import { TestBed } from '@angular/core/testing';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { HttpClientModule } from '@angular/common/http';

// import { ShortenerService } from './shortener.service';

// describe('ShortenerService', () => {
//   let service: ShortenerService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [ShortenerService],
//     });
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('createShortUrl should return valid http response', () => {
//     let longUrl = 'www.google.com';
//     let resp = null;
//     service.createShortUrl(longUrl).subscribe((data) => {
//       resp = data;
//     });

//     expect(resp).not.toBeUndefined;
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShortenerService } from '../services/shortener.service';

describe('shortenerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShortenerService],
    })
  );

  it('should be created', () => {
    const service: ShortenerService = TestBed.get(ShortenerService);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: ShortenerService = TestBed.get(ShortenerService);
    expect(service.createShortUrl).toBeTruthy();
  });

  it('createShortUrl should return non-null response', () => {
    const service: ShortenerService = TestBed.get(ShortenerService);
    let longUrl = 'www.google.com';
    let res = null;
    service.createShortUrl(longUrl).subscribe((resp) => {
      res = resp;
      let respUrl = res.LongUrl;
      expect(res).not.toBeNull();
      expect(respUrl).toBe(longUrl);
    });
  });
});
