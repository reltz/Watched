import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FileUtilsService
{
	public createObjectURL(file, fileUrl)
	{
		if (webkitURL)
		{
			if (fileUrl)
			{
				webkitURL.revokeObjectURL(fileUrl);
			}
			return webkitURL.createObjectURL(file);
		} else if (URL && URL.createObjectURL)
		{
			if (fileUrl)
			{
				URL.revokeObjectURL(fileUrl);
			}
			return URL.createObjectURL(file);
		} else
		{
			return null;
		}
	}

	public getCurrentDateTime(): string
	{
		const today = new Date();
		const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		const dateTime = date + '_' + time;
		return dateTime;
	}
}
