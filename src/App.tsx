import useMood from './hooks/useMood';
import MoodInPixels from './components/ui/MoodInPixels';
import MoodInput from './components/ui/MoodInput';
import Search from './components/ui/Search';
import DataManagment from './components/ui/DataManagment';
import { config } from './global/config';
import Footer from './components/ui/Footer';
import ThemeToggler from './components/shared/ThemeToggler';

export default function App() {
  const {
    sortedEntries,
    selectedEntry,
    setEntries,
    updateEntry,
    deleteEntry,
    selectedDate,
    setSelectedDate,
    searchResults,
    setSearchResults,
  } = useMood();

  return (
    <div className='min-h-screen flex flex-col items-center justify-start p-6 gap-6 [&>*]:max-w-xl'>
      <div className='font-mono'>
        <h1 className='text-3xl font-bold'> {config.appName}</h1>
        <h2 className='text-xs text-center'>{config.version}</h2>
      </div>
      <ThemeToggler />

      <Search
        entries={sortedEntries}
        onSearchResults={(results) => {
          setSearchResults(results);
        }}
      />

      {/* Mood Input Card */}
      <MoodInput
        selectedEntry={selectedEntry}
        deleteEntry={deleteEntry}
        updateEntry={updateEntry}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Color Grid */}
      <MoodInPixels
        entries={searchResults}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />

      {/* Data Management */}
      <DataManagment
        entries={sortedEntries}
        onDataLoaded={(data) => {
          setEntries(data);
        }}
      />

      <Footer />
    </div>
  );
}
