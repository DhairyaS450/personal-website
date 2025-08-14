declare module 'html-react-parser' {
  import * as React from 'react';
  function parse(html: string): React.ReactNode;
  export default parse;
}
