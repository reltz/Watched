import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { ColectionLandingComponent } from './Pages/Colection/colection-landing/colection-landing.component';
import { ColectionPageComponent } from './Pages/Colection/colection-page/colection-page.component';
import { ColectionTableComponent } from './Pages/Colection/colection-table/colection-table.component';
import { CreateColectionDialogComponent } from './Pages/Colection/create-colection-dialog/create-colection-dialog.component';
import { MovieComponent } from './Pages/Movie/movie/movie.component';
import { AddToColectionDialogComponent } from './Pages/Search/add-to-colection-dialog/add-to-colection-dialog.component';
import { SearchBarComponent } from './Pages/Search/search-bar/search-bar.component';
import { SearchPageComponent } from './Pages/Search/search-page/search-page.component';
import { SearchResultItemComponent } from './Pages/Search/search-result-item/search-result-item.component';
import { SearchResultWrapperComponent } from './Pages/Search/search-result-wrapper/search-result-wrapper.component';
import { MainService } from './Services/main.service';
import { RoutingService } from './Services/routing.service';
import { WatchedQuery } from './State/WatchedQuery';
import { WatchedStore } from './State/WatchedStore';
import { ConfirmDeleteColectionComponent } from './Pages/Colection/confirm-delete-colection/confirm-delete-colection.component';

const MatModules = [
	MatCardModule,
	MatFormFieldModule,
	MatButtonModule,
	MatInputModule,
	MatIconModule,
	MatToolbarModule,
	MatMenuModule,
	MatDialogModule,
	MatSelectModule,
	MatTableModule,
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
		NavigationMenuComponent,
		ColectionLandingComponent,
		CreateColectionDialogComponent,
		AddToColectionDialogComponent,
		ConfirmDeleteColectionComponent,
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
	providers: [
		WatchedQuery,
		WatchedStore,
		MainService,
		RoutingService,
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
