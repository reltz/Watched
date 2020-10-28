import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './Search/search-bar/search-bar.component';
import { SearchResultItemComponent } from './Search/search-result-item/search-result-item.component';
import { SearchResultWrapperComponent } from './Search/search-result-wrapper/search-result-wrapper.component';
import { SearchPageComponent } from './Search/search-page/search-page.component';

const MatModules = [
	MatCardModule,
	MatFormFieldModule,
	MatButtonModule,
	MatInputModule,
	MatIconModule,
	MatToolbarModule,
];

@NgModule({
	declarations: [
		AppComponent,
		SearchBarComponent,
		SearchResultItemComponent,
		SearchResultWrapperComponent,
		SearchPageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		...MatModules,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
