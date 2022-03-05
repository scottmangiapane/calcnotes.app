import { createRef, useContext, useEffect } from 'react';
import Prism from 'prismjs';

import { AppContext } from './App';

import './Editor.css';

function Editor() {
  const editingRef = createRef();
  const growWrapRef = createRef();
  const highlightingRef = createRef();
  const prismRef = createRef();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (prismRef.current) {
      Prism.highlightElement(prismRef.current);
    }
  });

  function onInput(event) {
    dispatch({ type: 'UPDATE_INPUT', data: event.target.value });
    growWrapRef.current.dataset.replicatedValue = event.target.value;
    syncScroll();
  }

  function syncScroll() {
    highlightingRef.current.scrollLeft = editingRef.current.scrollLeft;
    highlightingRef.current.scrollTop = editingRef.current.scrollTop;
  }

  return (
    <div id='editor-wrapper'>
      <div ref={ growWrapRef } className='grow-wrap'>
        <textarea
          ref={ editingRef }
          id='editor-input'
          autoFocus
          onInput={ onInput }
          onScroll={ syncScroll }
          spellCheck='false'
        />
      </div>
      <pre ref={ highlightingRef } id='editor-highlighting'>
        <code ref={ prismRef } className='language-javascript'>
          { state.text }
        </code>
      </pre>
    </div>
  );
}

export default Editor;
