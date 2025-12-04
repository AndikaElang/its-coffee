import React from 'react';

export function linkifyStr(text: string): React.ReactNode[] {
  // First, handle links / URLs / emails / phones
  const linkRegex =
    /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s]+)|([\w.-]+@[\w.-]+\.\w+)|(\b\d{10,15}\b)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  text.replace(linkRegex, (match, markdown, label, mdUrl, url, email, phone, offset) => {
    if (lastIndex < offset) {
      const before = text.slice(lastIndex, offset);
      parts.push(...parseInlineMarkdown(before));
    }

    if (markdown && mdUrl) {
      parts.push(
        <a key={offset} href={mdUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {label}
        </a>,
      );
    } else if (url) {
      parts.push(
        <a key={offset} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {url}
        </a>,
      );
    } else if (email) {
      parts.push(
        <a key={offset} href={`mailto:${email}`} className="text-blue-600 underline">
          {email}
        </a>,
      );
    } else if (phone) {
      parts.push(
        <a
          key={offset}
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {phone}
        </a>,
      );
    }

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push(...parseInlineMarkdown(text.slice(lastIndex)));
  }

  return parts;
}

/**
 * Parse inline markdown: bold, italic, underline
 */
function parseInlineMarkdown(segment: string): React.ReactNode[] {
  const regex = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(__([^_]+)__)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  segment.replace(regex, (match, bold, boldText, italic, italicText, underline, underlineText, offset) => {
    if (lastIndex < offset) {
      nodes.push(segment.slice(lastIndex, offset));
    }

    if (bold) nodes.push(<strong key={offset}>{boldText}</strong>);
    else if (italic) nodes.push(<em key={offset}>{italicText}</em>);
    else if (underline) nodes.push(<u key={offset}>{underlineText}</u>);

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < segment.length) {
    nodes.push(segment.slice(lastIndex));
  }

  return nodes;
}
