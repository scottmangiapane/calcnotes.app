// import { clipboard } from 'electron';
import { evaluate } from 'mathjs';
import { useContext } from 'react';

import { AppContext } from '../App';

import './Solutions.css';

function copyEvent(event) {
  // const text = event.target.innerText;
  // clipboard.writeText(text);
}

export default () => {
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
      <p
        key={ index }
        className='solution'
        onClick={ copyEvent }
      >{ solution }</p>
    );
  }

  return (
    <div className='solutions-wrapper'>
      { solutions }
    </div>
  );
}
