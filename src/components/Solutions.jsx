// import { clipboard } from 'electron';
import { evaluate } from 'mathjs';
import { useContext } from 'react';

import { AppContext } from './App';

import './Solutions.css';

function copyEvent(event) {
  console.log(event.target.innerText);
  // const text = event.target.innerText;
  // clipboard.writeText(text);
}

function Solutions() {
  const { state } = useContext(AppContext);
  const scope = {};
  const solutions = [];
  const lines = state.text.split('\n');

  for (const [index, line] of lines.entries()) {
    let output;
    try {
        output = evaluate(line, scope);
    } catch (e) { }
    let solution;
    switch (typeof output) {
      case 'boolean':
        solution = (
          <p className='solution solution-boolean' onClick={ copyEvent }>
            { JSON.stringify(output) }
          </p>
        );
        break;
      case 'number':
        const rounded = Math.round(output * 100) / 100;
        solution = (
          <p className='solution solution-number' onClick={ copyEvent }>
            { rounded }
          </p>
        );
        break;
      default:
        solution = (
          <p className='solution solution-string' onClick={ copyEvent }>
            { JSON.stringify(output) }
          </p>
        );
    }
    solutions.push(
      <div key={ index } className='ellipsis solution-wrapper'>
        { solution }
      </div>
    );
  }

  return <>{ solutions }</>;
}

export default Solutions;
