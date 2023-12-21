import { TestBed } from '@angular/core/testing';

import { MyHttpServiceService } from './my-http-service.service';

describe('MyHttpServiceService', () => {
  let service: MyHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
