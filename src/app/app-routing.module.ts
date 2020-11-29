import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColectionLandingComponent } from './Pages/Colection/colection-landing/colection-landing.component';
import { ColectionPageComponent } from './Pages/Colection/colection-page/colection-page.component';
import { SearchPageComponent } from './Pages/Search/search-page/search-page.component';

const routes: Routes = [
	{ path: 'search', component: SearchPageComponent },
	{ path: 'colections', component: ColectionPageComponent },
	{ path: 'colection', component: ColectionLandingComponent },
	{ path: 'colection/:id', component: ColectionLandingComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
