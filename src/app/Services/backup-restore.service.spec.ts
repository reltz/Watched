import { TestBed } from '@angular/core/testing';

import { BackupRestoreService } from './backup-restore.service';

describe('BackupRestoreServiceService', () =>
{
	let service: BackupRestoreService;

	beforeEach(() =>
	{
		TestBed.configureTestingModule({});
		service = TestBed.inject(BackupRestoreService);
	});

	it('should be created', () =>
	{
		expect(service).toBeTruthy();
	});
});
