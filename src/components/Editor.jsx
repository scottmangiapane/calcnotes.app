import { createRef, useContext, useEffect } from 'react';
import Prism from 'prismjs';

import { AppContext } from './App';

import './Editor.css';

function Editor() {
  const growWrapRef = createRef();
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
  }

  return (
    <div id='editor-wrapper'>
      <div ref={ growWrapRef } className='grow-wrap'>
        <textarea
          id='editor-input'
          autoFocus
          onInput={ onInput }
          spellCheck='false'
        />
      </div>
      <pre id='editor-highlighting'>
        <code ref={ prismRef } className='language-javascript'>
          { state.text }
        </code>
      </pre>
    </div>
  );
}

export default Editor;
