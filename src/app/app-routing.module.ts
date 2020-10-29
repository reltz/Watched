import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColectionPageComponent } from './Pages/Colection/colection-page/colection-page.component';
import { ColectionTableComponent } from './Pages/Colection/colection-table/colection-table.component';
import { SearchPageComponent } from './Pages/Search/search-page/search-page.component';

const routes: Routes = [
	{ path: 'search', component: SearchPageComponent },
	{
		path: 'colections',
		component: ColectionPageComponent,
		children: [
			{
				path: '?id',
				component: ColectionTableComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
