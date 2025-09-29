import { useCallback } from 'react';
import type { Entry } from '../global/types';

/**
 * Converts a JavaScript object to a CSV string.
 * @param data - The object to convert to CSV.
 * @see https://gist.github.com/dannypule/48418b4cd8223104c6c92e3016fc0f61
 * @returns The CSV string representation of the object.
 */
function convertToCSV(headers: string[], objArray: object | object[]) {
  const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  str += headers.join(',') + '\r\n';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line != '') line += ',';

      line += array[i][index];
    }

    str += line + '\r\n';
  }

  return str;
}

/**
 * Helper function to trigger file download in the browser.
 * @param data - The data blob to download
 * @param filename - The name of the file to be downloaded
 * @param type - The MIME type of the file
 */
function triggerFileDownload(data: Blob, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

/**
 * Custom hook for exporting Entry data in various formats (JSON, XML, CSV).
 * @returns An object containing export functions.
 */
export function useExport() {
  const exportToJSON = useCallback((data: Entry | Entry[], title: string) => {
    const dataWithMeta = { entries: data };

    const jsonData = JSON.stringify(dataWithMeta, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });

    triggerFileDownload(blob, `${title}.json`, 'application/json');
  }, []);

  const exportToCSV = useCallback((data: Entry[], title: string) => {
    const csvData = convertToCSV(Object.keys(data[0]), data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    triggerFileDownload(blob, `${title}.csv`, 'text/csv');
  }, []);

  return { exportToJSON, exportToCSV };
}
