// import { clipboard } from 'electron';
import { evaluate } from 'mathjs';
import { useContext } from 'react';

import { AppContext } from './App';

import './Solutions.css';

function Solutions() {
  const { state } = useContext(AppContext);
  const scope = {};
  const solutions = [];
  const lines = state.text.split('\n');

  function copyEvent(event) {
    const text = event.target.innerText;
    navigator.clipboard.writeText(text);
  }

  for (const [index, line] of lines.entries()) {
    let output;
    try {
      output = evaluate(line, scope);
    } catch (e) { /* ignored */ }
    const formatted = (typeof output === 'number')
      ? Math.round(output * 100) / 100
      : JSON.stringify(output);
    const solution = (formatted === undefined)
    ? <br />
    : (
      <p className='solution' onClick={ copyEvent }>
        { formatted }
      </p>
    );
    solutions.push(
      <div key={ index } className='ellipsis solution-wrapper'>
        { solution }
      </div>
    );
  }

  return <>{ solutions }</>;
}

export default Solutions;
