import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './Search/search-bar/search-bar.component';
import { SearchResultItemComponent } from './Search/search-result-item/search-result-item.component';
import { SearchResultWrapperComponent } from './Search/search-result-wrapper/search-result-wrapper.component';

const MatModules = [
	MatCardModule,
];

@NgModule({
	declarations: [
		AppComponent,
		SearchBarComponent,
		SearchResultItemComponent,
		SearchResultWrapperComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		...MatModules,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
