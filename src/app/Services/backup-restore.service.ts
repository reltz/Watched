import { Injectable } from '@angular/core';
import { LocalStorageAdapterService } from '../Adapters/local-storage-adapter.service';
import { FileUtilsService } from './file-utils.service';

@Injectable({
	providedIn: 'root',
})
export class BackupRestoreService
{

	private fileIdentifier: string = 'WatchedLS';
	constructor(
		protected readonly adapter: LocalStorageAdapterService,
		protected readonly fileUtils: FileUtilsService,
	) { }

	private fileUrl: any;
	private readonly localDBName: string = 'WatchedLS';

	public downloadBackup()
	{
		const data = this.fileIdentifier + localStorage.getItem(this.localDBName);
		const blob = new Blob([data], { type: 'text/txt' });

		this.fileUrl = this.fileUtils.createObjectURL(blob, this.fileUrl);
		return this.fileUrl;
	}

	public restore(content: string)
	{
		if (!!content && content !== '' && content.substring(0, this.fileIdentifier.length) === this.fileIdentifier)
		{
			content = content.slice(this.fileIdentifier.length);
			this.adapter.restoreData(content);
		}
		else
		{
			const error = 'Invalid file, please upload a valid backup file';
			console.error('Invalid file, please upload a valid backup file');
			alert(error);
		}
	}
}
