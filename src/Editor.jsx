import Prism from 'prismjs';
import { createRef, useContext, useEffect } from 'react';

import { AppContext } from './App';

import './Editor.css';

function Editor() {
  const editorRef = createRef();
  const prismRef = createRef();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (prismRef.current) {
      Prism.highlightElement(prismRef.current);
    }
  });

  useEffect(() => {
    const end = editorRef.current.value.length;
    editorRef.current.setSelectionRange(end, end);
    editorRef.current.blur();
    editorRef.current.focus();
  }, []);

  function onBlur() {
    editorRef.current.focus();
  }

  function onInput(event) {
    const sanitized = event.target.value.replaceAll('\u00a0', ' ');
    dispatch({ type: 'UPDATE_INPUT', data: sanitized });
  }

  return (
    <div id='editor-wrapper'>
      <pre id='editor-highlighting'>
        <code ref={ prismRef } className='language-javascript'>
          { state.text }
        </code>
        <br />
      </pre>
      <textarea
        ref={ editorRef }
        id='editor-typing'
        autoFocus
        onBlur={ onBlur }
        onInput={ onInput }
        spellCheck='false'
        value={ state.text }
      />
    </div>
  );
}

export default Editor;
