import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

function TextInput({ value, onChange }: TextInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste your text here..."
      className="w-full h-48 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
    />
  );
}

export default TextInput;