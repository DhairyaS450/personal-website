declare module 'sanitize-html' {
  export interface IOptions {
    allowedTags?: false | string[];
    allowedAttributes?: Record<string, string[]>;
    transformTags?: Record<string, unknown>;
    allowedSchemes?: string[];
    disallowedTagsMode?: 'discard' | 'recursiveEscape' | 'escape';
    allowProtocolRelative?: boolean;
  }
  export interface SimpleTransformResult {
    tagName: string;
    attribs: Record<string, string>;
  }
  interface SanitizeFn {
    (dirty: string, options?: IOptions): string;
    simpleTransform(tagName: string, attribs: Record<string,string>): SimpleTransformResult;
  }
  const sanitize: SanitizeFn;
  export default sanitize;
}
