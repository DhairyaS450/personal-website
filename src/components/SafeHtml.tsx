import React from 'react';
import sanitizeHtml, { IOptions } from 'sanitize-html';
import parse from 'html-react-parser';

// Central place to sanitize + parse stored HTML content coming from the editor.
// We strip scripts, event handlers, iframes (unless explicitly allowed), and unsafe URLs.
// Adjust allowed tags/attributes incrementally as you need richer formatting.

const allowedTags = [
  'h1','h2','h3','h4','h5','h6','blockquote','p','a','ul','ol','li','b','i','strong','em','u','code','pre','hr','br','img','span'
];

const allowedAttributes: IOptions['allowedAttributes'] = {
  a: ['href','name','target','rel'],
  img: ['src','alt','title','width','height'],
  '*': ['class']
};

const transformTags: IOptions['transformTags'] = {
  a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer nofollow' })
};

const allowedSchemes = ['http','https','mailto'];

export interface SafeHtmlProps {
  html: string;
  className?: string;
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
  const clean = sanitizeHtml(html || '', {
    allowedTags,
    allowedAttributes,
    transformTags,
    allowedSchemes,
    disallowedTagsMode: 'discard',
    // Prevent data URLs unless you decide to allow specific ones
    allowProtocolRelative: false,
  });

  return <div className={className}>{parse(clean)}</div>;
}

export default SafeHtml;
