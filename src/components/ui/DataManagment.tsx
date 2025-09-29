import {
  FaFileCode,
  FaFileCsv,
  FaFolderOpen,
  FaSave,
  FaTrash,
} from 'react-icons/fa';
import type { Entry } from '../../global/types';
import { useExport } from '../../hooks/useExport';
import { useSaveLoad } from '../../hooks/useSaveLoad';
import Card from '../shared/Card';

interface DataManagmentProps {
  entries: Entry[];
  onDataLoaded: (data: Entry[]) => void;
}

function DataManagment({ entries, onDataLoaded }: DataManagmentProps) {
  const [save, load] = useSaveLoad<Entry[]>('v1-void-savefile');
  const clearData = () => {
    if (window.confirm('Are you sure you want to delete all data?')) {
      onDataLoaded([]);
    }
  };
  const { exportToCSV, exportToJSON } = useExport();

  const handleSave = () => {
    save(entries, 'v1-void-data');
  };

  const handleExport = (format: 'json' | 'xml' | 'csv') => {
    switch (format) {
      case 'json':
        exportToJSON(entries, 'void-export-json');
        break;
      case 'csv':
        exportToCSV(entries, 'void-export-csv');
        break;
      default:
        console.error('Unsupported export format:', format);
    }
  };

  const handleLoad = () => {
    load((loadedData) => {
      if (loadedData) {
        onDataLoaded(loadedData);
      }
    });
  };

  return (
    <Card title='Data Management'>
      <fieldset className='mb-4 fieldset bg-base-300 p-4 rounded-lg border border-gray-600 w-fit'>
        <legend className='fieldset-legend'>Save and Load</legend>
        <div className='flex gap-4 flex-wrap'>
          <button type='button' className='btn' onClick={handleSave}>
            <FaSave /> Save Data
          </button>
          <button type='button' className='btn' onClick={handleLoad}>
            <FaFolderOpen /> Load Data
          </button>
          <button type='button' className='btn' onClick={clearData}>
            <FaTrash /> Delete Data
          </button>
        </div>
      </fieldset>
      <fieldset className='mb-4 fieldset bg-base-300 p-4 rounded-lg border border-gray-600 w-fit'>
        <legend className='fieldset-legend'>Export</legend>
        <div className='flex gap-4 flex-wrap'>
          <button
            type='button'
            className='btn'
            onClick={() => handleExport('json')}
          >
            <FaFileCode /> Export to JSON
          </button>
          <button
            type='button'
            className='btn'
            onClick={() => handleExport('csv')}
          >
            <FaFileCsv /> Export to CSV
          </button>
        </div>
      </fieldset>
    </Card>
  );
}

export default DataManagment;
