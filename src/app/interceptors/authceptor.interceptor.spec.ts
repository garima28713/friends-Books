import { TestBed } from '@angular/core/testing';

import { AuthceptorInterceptor } from './authceptor.interceptor';

describe('AuthceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthceptorInterceptor = TestBed.inject(AuthceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
