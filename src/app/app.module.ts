import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ContentComponent } from './content/content.component';
import { EventEmitterService } from './event-emitter.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
