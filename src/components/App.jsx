import { createContext, useReducer } from 'react';

import Editor from './Editor';
import Solutions from './Solutions';
import SplitPane from './SplitPane';
import Titlebar from './Titlebar';

import './App.css';

export const AppContext = createContext();

function App() {
  const initialState = { editorWidth: 0, text: '' };
  const [state, dispatch] = useReducer(appReducer, initialState);

  function appReducer(state, action) {
    switch (action.type) {
      case 'UPDATE_EDITOR_WIDTH':
        return { ...state, editorWidth: action.data }
      case 'UPDATE_INPUT':
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
            left={ <Editor className='fill' /> }
            right={ <Solutions className='fill' /> } />
        </AppContext.Provider>
      </div>
    </div>
  );
};

export default App;
