import React, { useRef, useEffect } from 'react';
// import * as monaco from 'monaco-editor';
/*
If you are encountering errors when using
import * as monaco from 'monaco-editor';

, it could be due to the way Monaco Editor is structured and bundled.

Monaco Editor is typically distributed as a set of AMD modules (Asynchronous Module Definition), and the import * as monaco from 'monaco-editor'; syntax is attempting to import it as an ES module, which might not work seamlessly.

To address this issue, you can try using the following import syntax:
*/
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import './index.css'

// Set up Monaco environment
// eslint-disable-next-line no-restricted-globals
/*
self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  },
};
*/

export const Editor: React.FC = () => {
  const divEl = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor | null = null;

  useEffect(() => {
    const initEditor = () => {
      if (divEl.current) {
        editor = monaco.editor.create(divEl.current, {
          value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
          language: 'typescript',
        });
      }
    };

    initEditor();

    // Cleanup
    return () => {
      if (editor) {
        editor.dispose();
      }
    };
  }, []);

  return <div className="Editor" ref={divEl}></div>;
};
