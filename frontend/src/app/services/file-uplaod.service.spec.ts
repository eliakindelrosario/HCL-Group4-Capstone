import { TestBed } from '@angular/core/testing';

import { FileUplaodService } from './file-uplaod.service';

describe('FileUplaodService', () => {
  let service: FileUplaodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUplaodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
