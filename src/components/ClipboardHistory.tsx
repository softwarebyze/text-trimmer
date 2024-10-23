import React from 'react';
import { ClipboardList, Clock, Star, Trash2, Pin } from 'lucide-react';

interface HistoryItem {
  text: string;
  timestamp: number;
  isPinned?: boolean;
  isFavorite?: boolean;
}

interface ClipboardHistoryProps {
  history: HistoryItem[];
  onSelect: (text: string) => void;
  onPin?: (index: number) => void;
  onFavorite?: (index: number) => void;
  onDelete?: (index: number) => void;
  onClear?: () => void;
}

function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return new Date(timestamp).toLocaleDateString();
}

function ClipboardHistory({ 
  history, 
  onSelect, 
  onPin, 
  onFavorite, 
  onDelete,
  onClear 
}: ClipboardHistoryProps) {
  if (!history.length) {
    return (
      <div className="text-gray-500 text-center py-4 text-sm">
        Copied text will appear here
      </div>
    );
  }

  const pinnedItems = history.filter(item => item.isPinned);
  const unpinnedItems = history.filter(item => !item.isPinned);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {history.length} items in history
        </div>
        {onClear && (
          <button
            onClick={onClear}
            className="text-xs text-red-500 hover:text-red-600 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 -mr-2">
        {pinnedItems.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-medium text-gray-500 mb-2">PINNED</div>
            {pinnedItems.map((item, i) => (
              <HistoryItem
                key={`pinned-${i}`}
                item={item}
                index={i}
                onSelect={onSelect}
                onPin={onPin}
                onFavorite={onFavorite}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}

        {unpinnedItems.map((item, i) => (
          <HistoryItem
            key={i}
            item={item}
            index={i}
            onSelect={onSelect}
            onPin={onPin}
            onFavorite={onFavorite}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

interface HistoryItemProps {
  item: HistoryItem;
  index: number;
  onSelect: (text: string) => void;
  onPin?: (index: number) => void;
  onFavorite?: (index: number) => void;
  onDelete?: (index: number) => void;
}

function HistoryItem({ 
  item, 
  index, 
  onSelect, 
  onPin, 
  onFavorite, 
  onDelete 
}: HistoryItemProps) {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg p-2 hover:border-indigo-200 transition-all">
      <div className="flex items-center space-x-3">
        <div 
          className="flex-1 cursor-pointer"
          onClick={() => onSelect(item.text)}
        >
          <div className="flex items-center space-x-2">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <p className="text-sm text-gray-600 truncate">
              {item.text}
            </p>
          </div>
          <div className="mt-1 flex items-center space-x-2">
            <span className="text-xs text-gray-400">
              {formatTimestamp(item.timestamp)}
            </span>
            {item.isFavorite && (
              <span className="text-xs text-yellow-500">★ Favorite</span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onPin && (
            <button
              onClick={() => onPin(index)}
              className={`p-1 rounded-md hover:bg-gray-100 transition-colors ${
                item.isPinned ? 'text-indigo-500' : 'text-gray-400'
              }`}
            >
              <Pin className="h-3.5 w-3.5" />
            </button>
          )}
          {onFavorite && (
            <button
              onClick={() => onFavorite(index)}
              className={`p-1 rounded-md hover:bg-gray-100 transition-colors ${
                item.isFavorite ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              <Star className="h-3.5 w-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(index)}
              className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClipboardHistory;