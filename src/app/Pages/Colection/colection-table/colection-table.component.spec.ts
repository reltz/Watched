import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { IColection } from 'src/app/Models/ApiModels';
import { MainService } from 'src/app/Services/main.service';
import { WatchedQuery } from 'src/app/State/WatchedQuery';
import { makeFakeCollection, makeFakeMovie } from 'src/app/test-utils/utils';

import { ColectionTableComponent } from './colection-table.component';

fdescribe('ColectionTableComponent', () =>
{
	let target: ColectionTableComponent;
	let querySpyObj: jasmine.SpyObj<WatchedQuery>;
	let mainSvc: jasmine.SpyObj<MainService>;
	let router: jasmine.SpyObj<ActivatedRoute>;
	let dialog: jasmine.SpyObj<MatDialog>;

	const mockColection: IColection = {
		id: "123",
		movies: [makeFakeMovie({ Id: "1234" })],
		name: "col1"
	};

	const collectionSubject = new BehaviorSubject(mockColection);

	beforeEach(() =>
	{

		querySpyObj = jasmine.createSpyObj("WatchedQuery", { selectEntity: collectionSubject.asObservable() });
		// querySpyObj.selectEntity.and.returnValue(of(mockColection));

		mainSvc = jasmine.createSpyObj("MainService", { removeMovie: () => of(null) });
		// mainSvc.removeMovie.and.returnValue(of(null));

		router = jasmine.createSpyObj("ActivatedRoute", [""]);
		router.params = of({ id: "123" });

		dialog = jasmine.createSpyObj("MatDialog", ["open"]);
		dialog.open.and.returnValue({ afterClosed: () => of(true) } as any);

		target = new ColectionTableComponent(querySpyObj, mainSvc, router, dialog);
	})

	it("shoul be defined", () =>
	{
		expect(target).toBeTruthy();
	});

	describe("onInit", () =>
	{
		it("should set the collection", fakeAsync(() =>
		{
			target.ngOnInit();

			tick();
			expect(target).toBeTruthy();

			expect(target.colection).toEqual(mockColection);
		}));
	});
	describe("removeMovie", () =>
	{

		it("should delete movie if bypassConfirmation is false and user confirmed", fakeAsync(() =>
		{
			target.ngOnInit();
			tick();

			target.removeMovie("1234");
			tick();

			expect(target.colection).toEqual(makeFakeCollection());
		}));
	})
});
