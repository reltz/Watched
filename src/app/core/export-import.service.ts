import { Injectable } from '@angular/core';
import { ICollection } from '../models/api-models';

/**
 * Serializes a collection to a downloadable JSON file and parses imported files.
 */
@Injectable({ providedIn: 'root' })
export class ExportImportService {
  exportCollection(collection: ICollection): void {
    const blob = new Blob([JSON.stringify(collection, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${collection.name}-${this.timestamp()}.json`;
    link.click();

    URL.revokeObjectURL(url);
  }

  parseCollection(content: string): ICollection {
    const parsed = JSON.parse(content) as ICollection;
    if (!parsed.id || !parsed.name || !Array.isArray(parsed.movies)) {
      throw new Error('File is not a valid collection.');
    }
    return parsed;
  }

  private timestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  }
}
