import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { InjectSessionInterceptor } from './core/interceptors/inject-session.interceptor';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    HttpClient,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectSessionInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppModule],
})
export class AppModule {}
