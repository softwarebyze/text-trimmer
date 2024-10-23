interface ChunkVisualizerProps {
  text: string;
  chunks: string[];
  chunkSize: number;
}

function ChunkVisualizer({ text, chunks, chunkSize }: ChunkVisualizerProps) {
  if (!text) {
    return (
      <div className="text-gray-500 text-center py-8">
        Enter text to see chunk visualization
      </div>
    );
  }

  const totalLength = text.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Total length: {totalLength} characters</span>
        <span>Chunks: {chunks.length}</span>
      </div>

      <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
        {chunks.map((chunk, i) => {
          const width = (chunk.length / totalLength) * 100;
          return (
            <div
              key={i}
              className="absolute h-full bg-indigo-400 opacity-80 first:rounded-l-lg last:rounded-r-lg"
              style={{
                left: `${
                  (chunks.slice(0, i).reduce((acc, c) => acc + c.length, 0) /
                    totalLength) *
                  100
                }%`,
                width: `${width}%`,
              }}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Average chunk size: </span>
          {Math.round(
            chunks.reduce((acc, chunk) => acc + chunk.length, 0) / chunks.length
          )}{' '}
          characters
        </div>
        <div>
          <span className="font-medium">Target size: </span>
          {chunkSize} characters
        </div>
      </div>
    </div>
  );
}

export default ChunkVisualizer;
