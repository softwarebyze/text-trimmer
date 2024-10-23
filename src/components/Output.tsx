import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface OutputProps {
  chunks: string[];
  onCopy: (text: string) => void;
}

function Output({ chunks, onCopy }: OutputProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    onCopy(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!chunks.length) {
    return (
      <div className="text-gray-500 text-center py-8">
        Chunks will appear here
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {chunks.map((chunk, i) => (
        <div
          key={i}
          className="relative group border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors"
        >
          <div className="absolute right-2 top-2">
            <button
              onClick={() => copyToClipboard(chunk, i)}
              className="p-1.5 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              {copiedIndex === i ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Chunk {i + 1}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">{chunk}</p>
        </div>
      ))}
    </div>
  );
}

export default Output;