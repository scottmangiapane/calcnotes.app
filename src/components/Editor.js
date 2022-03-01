import { createRef, useContext, useEffect, useState } from 'react';
import Prism from 'prismjs';

import { AppContext } from '../App';

import './Editor.css';
import './PrismTheme.css';

function syncScroll(editingRef, highlightingRef) {
  if (editingRef?.current && highlightingRef?.current) {
    highlightingRef.current.scrollLeft = editingRef.current.scrollLeft;
    highlightingRef.current.scrollTop = editingRef.current.scrollTop;
  }
}

function Editor() {
  const { state, dispatch } = useContext(AppContext);

  const editingRef = createRef();
  const highlightingRef = createRef();
  const prismRef = createRef();

  const [rows, setRows] = useState(0);

  useEffect(() => {
    if (prismRef?.current) {
      Prism.highlightElement(prismRef.current);
    }
  });

  return (
    <div id='wrapper'>
      <textarea
        ref={ editingRef }
        id='edit'
        autoFocus
        rows={ rows }
        spellCheck='false'
        onInput={ (event) => {
          setRows( event.target.value.split('\n').length );
          dispatch({ type: 'UPDATE_INPUT', data: event.target.value });
          syncScroll(editingRef, highlightingRef);
        } }
        onScroll={ () => syncScroll(editingRef, highlightingRef) }
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
