import Prism from 'prismjs';
import { createRef, useContext, useEffect } from 'react';

import { AppContext } from './App';

import './Editor.css';

function Editor() {
  const prismRef = createRef();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (prismRef.current) {
      Prism.highlightElement(prismRef.current);
    }
  });

  function onInput(event) {
    dispatch({ type: 'UPDATE_INPUT', data: event.target.value });
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
        id='editor-typing'
        autoFocus
        onInput={ onInput }
        spellCheck='false'
      />
    </div>
  );
}

export default Editor;
