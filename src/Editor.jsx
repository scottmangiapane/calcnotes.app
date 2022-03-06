import Prism from 'prismjs';
import { createRef, forwardRef, useContext, useEffect } from 'react';

import { AppContext } from './App';

import './Editor.css';

const Editor = forwardRef((props, ref) => {
  const prismRef = createRef();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (prismRef.current) {
      Prism.highlightElement(prismRef.current);
    }
  });

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
        ref={ ref }
        id='editor-typing'
        autoFocus
        onInput={ onInput }
        spellCheck='false'
        value={ state.text }
      />
    </div>
  );
});

export default Editor;
