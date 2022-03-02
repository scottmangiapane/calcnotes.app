import { createContext, useReducer } from 'react';

import './App.css';
import Editor from './Editor';
import Solutions from './Solutions';
import Titlebar from './Titlebar';
import Divider from './split-pane/Divider';
import Pane from './split-pane/Pane';
import SplitPane from './split-pane/SplitPane';

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
        <AppContext.Provider value={{ state, dispatch }}>
          <SplitPane>
            <Pane>
              <Editor className='fill' />
            </Pane>
            <Divider />
            <Pane>
              <Solutions className='fill' />
            </Pane>
          </SplitPane>
        </AppContext.Provider>
      </div>
    </div>
  );
};

export default App;
