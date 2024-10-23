import React, { useState, useMemo, useEffect } from 'react';
import { SplitSquareHorizontal, Type, Settings2, ClipboardList } from 'lucide-react';
import TextInput from './components/TextInput';
import ChunkVisualizer from './components/ChunkVisualizer';
import SettingsPanel from './components/SettingsPanel';
import Output from './components/Output';
import ClipboardHistory from './components/ClipboardHistory';

interface HistoryItem {
  text: string;
  timestamp: number;
  isPinned?: boolean;
  isFavorite?: boolean;
}

function App() {
  const [text, setText] = useState('');
  const [chunkSize, setChunkSize] = useState(2000);
  const [overlap, setOverlap] = useState(100);
  const [clipboardHistory, setClipboardHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const handleClipboardRead = async () => {
      try {
        const text = await navigator.clipboard.readText();
        console.log({text})
        if (text && !clipboardHistory.some(item => item.text === text)) {
          setClipboardHistory(prev => [{
            text,
            timestamp: Date.now(),
            isPinned: false,
            isFavorite: false
          }, ...prev].slice(0, 50));
        }
      } catch (error) {
        console.error('Failed to read clipboard:', error);
      }
    };

    window.addEventListener('focus', handleClipboardRead);
    return () => window.removeEventListener('focus', handleClipboardRead);
  }, [clipboardHistory]);

  const chunks = useMemo(() => {
    if (!text) return [];
    const words = text.split(' ');
    const chunks = [];
    let currentChunk = [];
    let currentLength = 0;

    for (const word of words) {
      if (currentLength + word.length > chunkSize) {
        chunks.push(currentChunk.join(' '));
        currentChunk = [];
        currentLength = 0;
        
        if (overlap > 0) {
          const overlapWords = chunks[chunks.length - 1]
            .split(' ')
            .slice(-Math.floor(overlap / 10));
          currentChunk.push(...overlapWords);
          currentLength = overlapWords.join(' ').length;
        }
      }
      currentChunk.push(word);
      currentLength += word.length + 1;
    }
    
    if (currentChunk.length) {
      chunks.push(currentChunk.join(' '));
    }
    
    return chunks;
  }, [text, chunkSize, overlap]);

  const handleCopiedText = (copiedText: string) => {
    if (copiedText && !clipboardHistory.some(item => item.text === copiedText)) {
      setClipboardHistory(prev => [{
        text: copiedText,
        timestamp: Date.now(),
        isPinned: false,
        isFavorite: false
      }, ...prev].slice(0, 50));
    }
  };

  const handlePin = (index: number) => {
    setClipboardHistory(prev => {
      const newHistory = [...prev];
      newHistory[index] = { ...newHistory[index], isPinned: !newHistory[index].isPinned };
      return newHistory;
    });
  };

  const handleFavorite = (index: number) => {
    setClipboardHistory(prev => {
      const newHistory = [...prev];
      newHistory[index] = { ...newHistory[index], isFavorite: !newHistory[index].isFavorite };
      return newHistory;
    });
  };

  const handleDelete = (index: number) => {
    setClipboardHistory(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearHistory = () => {
    setClipboardHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <SplitSquareHorizontal className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">TextTrimmer</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Type className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-medium text-gray-900">Input Text</h2>
              </div>
              <TextInput value={text} onChange={setText} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ClipboardList className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-medium text-gray-900">Clipboard History</h2>
              </div>
              <ClipboardHistory
                history={clipboardHistory}
                onSelect={setText}
                onPin={handlePin}
                onFavorite={handleFavorite}
                onDelete={handleDelete}
                onClear={handleClearHistory}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings2 className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-medium text-gray-900">Settings</h2>
              </div>
              <SettingsPanel
                chunkSize={chunkSize}
                overlap={overlap}
                onChunkSizeChange={setChunkSize}
                onOverlapChange={setOverlap}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
              <ChunkVisualizer
                text={text}
                chunks={chunks}
                chunkSize={chunkSize}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Output</h2>
              <Output 
                chunks={chunks}
                onCopy={handleCopiedText}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;