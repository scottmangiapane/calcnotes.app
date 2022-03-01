// import { clipboard } from 'electron';
import { evaluate } from 'mathjs';
import { useContext } from 'react';

import { AppContext } from '../App';

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
    let solution;
    try {
        solution = evaluate(line, scope);
        solution = (typeof solution == 'number')
          ? Math.round(solution * 100) / 100
          : JSON.stringify(solution);
    } catch (e) { /* do nothing */ }
    solutions.push(
      <div key={ index } className='ellipsis solution-wrapper'>
        <p className='solution' onClick={ copyEvent }>{ solution }</p>
      </div>
    );
  }

  return <>{ solutions }</>;
}

export default Solutions;
