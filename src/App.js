import { createContext, useReducer } from 'react';

import './App.css';
import Editor from './components/Editor';
import Solutions from './components/Solutions';
import Titlebar from './components/Titlebar';

export const AppContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return { ...state, text: action.data };
    default:
      return initialState;
  }
}

const initialState = { text: '' };

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='App'>
      <Titlebar />
      <div className='dashboard'>
        <div>
          <AppContext.Provider value={{ state, dispatch }}>
            <div className='horizontal-full'>
              <div className='horizontal-half'>
                <Editor className='fill' />
              </div>
              <div className='horizontal-half'>
                <Solutions className='fill' />
              </div>
            </div>
            </AppContext.Provider>
          </div>
      </div>
    </div>
  );
};

export default App;
