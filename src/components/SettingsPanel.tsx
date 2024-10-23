import React from 'react';

interface SettingsPanelProps {
  chunkSize: number;
  overlap: number;
  onChunkSizeChange: (size: number) => void;
  onOverlapChange: (overlap: number) => void;
}

function SettingsPanel({
  chunkSize,
  overlap,
  onChunkSizeChange,
  onOverlapChange,
}: SettingsPanelProps) {
  const min = 500
  const max = 8000
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1">
          Chunk Size (characters)
        </label>
        <input
          type="number"
          value={chunkSize}
          className="ms-4 border"
          />
        <input
          type="range"
          min={`${min}`}
          max={`${max}`}

          value={chunkSize}
          onChange={(e) => onChunkSizeChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>{min}</span>
          <span>{chunkSize}</span>
          <span>{max}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Overlap Size (characters)
        </label>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={overlap}
          onChange={(e) => onOverlapChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>0</span>
          <span>{overlap}</span>
          <span>500</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;