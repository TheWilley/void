import { useCallback } from 'react';

export function useSaveLoad<T>(id: string) {
  const save = useCallback(
    (data: T, title: string) => {
      const jsonData = JSON.stringify({ id, data });
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.json`;
      a.click();

      URL.revokeObjectURL(url);
    },
    [id],
  );

  const load = useCallback(
    (callback: (data?: T) => void) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';

      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result as string);
            if (jsonData.id !== id) {
              console.error('Invalid ID in JSON file');
              return;
            }
            callback(jsonData.data as T);
          } catch (error) {
            console.error('Failed to parse JSON:', error);
            callback(undefined);
          }
        };
        reader.readAsText(file);
      };

      input.click();
    },
    [id],
  );

  return [save, load] as const;
}
