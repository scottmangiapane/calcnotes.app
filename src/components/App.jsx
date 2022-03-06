import { createContext, createRef, useEffect, useReducer } from 'react';

import Editor from './Editor';
import Solutions from './Solutions';
import SplitPane from './SplitPane';
import Titlebar from './Titlebar';

import './App.css';

export const AppContext = createContext();

function App() {
  let text = '';
  try {
    text = JSON.parse(localStorage.getItem('text'));
  } catch (e) { /* ignored */ }
  const initialState = { editorWidth: 0, text };
  const editorRef = createRef();
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const end = editorRef.current.value.length;
    editorRef.current.setSelectionRange(end, end);
    editorRef.current.blur();
    editorRef.current.focus();
  }, []);

  function appReducer(state, action) {
    switch (action.type) {
      case 'UPDATE_EDITOR_WIDTH':
        return { ...state, editorWidth: action.data }
      case 'UPDATE_INPUT':
        localStorage.setItem('text', JSON.stringify(action.data));
        return { ...state, text: action.data };
      default:
        return initialState;
    }
  }

  return (
    <div className='app'>
      <Titlebar />
      <div className='dashboard'>
        <AppContext.Provider value={{ state, dispatch }}>
          <SplitPane
            left={ <Editor ref={ editorRef } /> }
            right={ <Solutions /> } />
        </AppContext.Provider>
      </div>
    </div>
  );
};

export default App;
