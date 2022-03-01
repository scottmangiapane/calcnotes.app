import { createRef, useContext, useEffect } from 'react';
import Prism from 'prismjs';

import { AppContext } from '../App';

import './Editor.css';
import './PrismTheme.css';

function syncScroll(editingRef, highlightingRef) {
  // if (editingRef?.current && highlightingRef?.current) {
  //   highlightingRef.current.scrollLeft = editingRef.current.scrollLeft;
  //   highlightingRef.current.scrollTop = editingRef.current.scrollTop;
  // }
}

export default () => {
  const { state, dispatch } = useContext(AppContext);

  const editingRef = createRef();
  const highlightingRef = createRef();
  const prismRef = createRef();

  useEffect(() => {
    if (prismRef?.current) {
      Prism.highlightElement(prismRef.current);
    }
  });

  return (
    <div id='wrapper'>
      <textarea
        ref={ editingRef }
        autoFocus
        id='edit'
        spellCheck='false'
        onInput={ (event) => {
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
