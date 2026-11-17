import React from 'react';

/**
 * Parses markdown text containing **bold**, *italic*, bullets, and line breaks into proper JSX elements.
 * Prevents raw asterisks from showing in the UI.
 * @param {{ content: string }} props
 */
export function MarkdownMessage({ content }) {
  if (!content) return null;

  // Split into paragraphs / lines
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, lineIdx) => {
        // Handle empty lines as spacing
        if (!line.trim()) {
          return <div key={lineIdx} className="h-2" />;
        }

        // Handle list bullet items
        const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
        const cleanLine = isBullet ? line.trim().replace(/^[-*]\s+/, '') : line;

        // Parse **bold** parts in the line
        const parts = [];
        const boldRegex = /\*\*(.*?)\*\*/g;
        let lastIndex = 0;
        let match;

        while ((match = boldRegex.exec(cleanLine)) !== null) {
          if (match.index > lastIndex) {
            parts.push(cleanLine.substring(lastIndex, match.index));
          }
          parts.push(
            <strong key={`b-${match.index}`} className="font-semibold text-emerald-300">
              {match[1]}
            </strong>
          );
          lastIndex = boldRegex.lastIndex;
        }

        if (lastIndex < cleanLine.length) {
          parts.push(cleanLine.substring(lastIndex));
        }

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span>{parts}</span>
            </div>
          );
        }

        return <div key={lineIdx}>{parts}</div>;
      })}
    </div>
  );
}

export default MarkdownMessage;
