import React, { JSX } from 'react';

import { linkifyStr } from './LinkifyStr';

interface ListItem {
  type: 'main' | 'sub';
  content: string;
  marker: string;
}

interface Block {
  type: 'heading' | 'list' | 'text';
  level?: number; // For headings (1-6)
  content?: string; // For headings and text
  items?: ListItem[]; // For lists
}

export function minimalRichStr(rawText: string, olclass = 'list-decimal space-y-3'): React.ReactNode {
  const parseBlocks = (text: string): Block[] => {
    const lines = text.split('\n');
    const blocks: Block[] = [];
    let currentListItems: ListItem[] = [];

    const flushList = () => {
      if (currentListItems.length > 0) {
        blocks.push({ type: 'list', items: currentListItems });
        currentListItems = [];
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Check for headings (# to ######)
      const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        flushList();
        blocks.push({
          type: 'heading',
          level: headingMatch[1].length,
          content: headingMatch[2].trim(),
        });
        return;
      }

      // Check if it's a numbered item (main list)
      const mainMatch = trimmed.match(/^\s*(\d+)\.\s+(.+)$/);
      if (mainMatch) {
        currentListItems.push({
          type: 'main',
          marker: mainMatch[1],
          content: mainMatch[2].trim(),
        });
        return;
      }

      // Check if it's a lettered item (sub list)
      const subMatch = trimmed.match(/^\s*([a-z])\.\s+(.+)$/);
      if (subMatch) {
        currentListItems.push({
          type: 'sub',
          marker: subMatch[1],
          content: subMatch[2].trim(),
        });
        return;
      }

      // If we have text and there was a list before, flush it
      if (trimmed && currentListItems.length > 0) {
        flushList();
      }

      // Regular text or continuation
      if (trimmed) {
        if (currentListItems.length > 0) {
          // Continuation of list item
          currentListItems[currentListItems.length - 1].content += ' ' + trimmed;
        } else {
          // Regular text block
          blocks.push({ type: 'text', content: trimmed });
        }
      }
    });

    flushList();
    return blocks;
  };

  const renderNestedList = (items: ListItem[]) => {
    const result: JSX.Element[] = [];
    let currentSubList: ListItem[] = [];

    items.forEach((item, index) => {
      if (item.type === 'main') {
        if (currentSubList.length > 0) {
          result.push(
            <ol key={`sub-${index}`} className="list-[lower-alpha] ml-8 mt-2 mb-3 space-y-1">
              {currentSubList.map((subItem, subIndex) => (
                <li key={subIndex} className="text-gray-700 pl-2">
                  {linkifyStr(subItem.content)}
                </li>
              ))}
            </ol>,
          );
          currentSubList = [];
        }

        result.push(
          <li key={`main-${index}`} className="text-gray-900 pl-2 mb-2">
            {linkifyStr(item.content)}
          </li>,
        );
      } else if (item.type === 'sub') {
        currentSubList.push(item);
      }
    });

    if (currentSubList.length > 0) {
      result.push(
        <ol key={`sub-final`} className="list-[lower-alpha] ml-8 mt-2 mb-3 space-y-1">
          {currentSubList.map((subItem, subIndex) => (
            <li key={subIndex} className="text-gray-700 pl-2">
              {linkifyStr(subItem.content)}
            </li>
          ))}
        </ol>,
      );
    }

    return result;
  };

  const renderHeading = (level: number, content: string, key: string | number) => {
    const headingClasses = {
      1: 'text-3xl font-bold text-gray-900 mt-6 mb-4',
      2: 'text-2xl font-bold text-gray-900 mt-5 mb-3',
      3: 'text-xl font-semibold text-gray-900 mt-4 mb-3',
      4: 'text-lg font-semibold text-gray-800 mt-3 mb-2',
      5: 'text-base font-semibold text-gray-800 mt-3 mb-2',
      6: 'text-sm font-semibold text-gray-700 mt-2 mb-2',
    };

    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    const className = headingClasses[level as keyof typeof headingClasses] || headingClasses[6];

    return (
      <HeadingTag key={key} className={className}>
        {linkifyStr(content)}
      </HeadingTag>
    );
  };

  const blocks = parseBlocks(rawText);

  if (blocks.length === 0) return <>{linkifyStr(rawText)}</>;

  // If only one text block, return it directly without wrapper
  if (blocks.length === 1 && blocks[0].type === 'text') {
    return <>{linkifyStr(blocks[0].content || '')}</>;
  }

  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return renderHeading(block.level!, block.content!, `h-${index}`);
        } else if (block.type === 'list') {
          return (
            <ol key={`list-${index}`} className={olclass + ' ms-4'}>
              {renderNestedList(block.items!)}
            </ol>
          );
        } else {
          return (
            <p key={`text-${index}`} className="mb-3">
              {linkifyStr(block.content!)}
            </p>
          );
        }
      })}
    </>
  );
}
