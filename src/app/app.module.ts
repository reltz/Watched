import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColectionPageComponent } from './Pages/Colection/colection-page/colection-page.component';
import { ColectionTableComponent } from './Pages/Colection/colection-table/colection-table.component';
import { MovieComponent } from './Pages/Movie/movie/movie.component';
import { SearchBarComponent } from './Pages/Search/search-bar/search-bar.component';
import { SearchPageComponent } from './Pages/Search/search-page/search-page.component';
import { SearchResultItemComponent } from './Pages/Search/search-result-item/search-result-item.component';
import { SearchResultWrapperComponent } from './Pages/Search/search-result-wrapper/search-result-wrapper.component';

const MatModules = [
	MatCardModule,
	MatFormFieldModule,
	MatButtonModule,
	MatInputModule,
	MatIconModule,
	MatToolbarModule,
	MatMenuModule,
];

@NgModule({
	declarations: [
		AppComponent,
		SearchBarComponent,
		SearchResultItemComponent,
		SearchResultWrapperComponent,
		SearchPageComponent,
		ColectionPageComponent,
		ColectionTableComponent,
		MovieComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		...MatModules,
		environment.production ? [] : AkitaNgDevtools.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
