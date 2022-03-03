import { createRef, useContext, useEffect, useState } from 'react';
import Prism from 'prismjs';

import { AppContext } from './App';

import './Editor.css';

function Editor() {
  const editingRef = createRef();
  const highlightingRef = createRef();
  const prismRef = createRef();
  const { state, dispatch } = useContext(AppContext);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    if (prismRef.current) {
      Prism.highlightElement(prismRef.current);
    }
  });

  function onInput(event) {
    setRows( event.target.value.split('\n').length );
    dispatch({ type: 'UPDATE_INPUT', data: event.target.value });
    syncScroll();
  }

  function syncScroll() {
    highlightingRef.current.scrollLeft = editingRef.current.scrollLeft;
    highlightingRef.current.scrollTop = editingRef.current.scrollTop;
  }

  return (
    <div id='wrapper'>
      <textarea
        ref={ editingRef }
        id='edit'
        autoFocus
        rows={ rows }
        spellCheck='false'
        onInput={ onInput }
        onScroll={ syncScroll }
      />
      <pre ref={ highlightingRef } id='highlight'>
        <code ref={ prismRef } className='language-javascript'>
          { state.text }
        </code>
      </pre>
    </div>
  );
}

export default Editor;
