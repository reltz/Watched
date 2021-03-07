import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedLoginComponent } from './watched-login.component';

describe('LoginComponent', () =>
{
	let component: WatchedLoginComponent;
	let fixture: ComponentFixture<WatchedLoginComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule({
			declarations: [WatchedLoginComponent],
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(WatchedLoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () =>
	{
		expect(component).toBeTruthy();
	});
});
