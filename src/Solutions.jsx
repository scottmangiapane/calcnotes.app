import { evaluate } from 'mathjs';
import { useContext } from 'react';

import { AppContext } from './App';

import './Solutions.css';

function Solutions() {
  const { state } = useContext(AppContext);
  const scope = {};
  const solutions = [];
  const lines = state.text.split('\n');

  function calculateRows(line) {
    const actual = document.getElementById('editor-typing');
    if (!actual) {
      return 1;
    }
    const ruler = document.createElement('p');
    ruler.innerText = line;
    ruler.style.fontFamily = 'Roboto Mono';
    ruler.style.position = 'absolute';
    ruler.style.width = actual.offsetWidth + 'px';
    ruler.style.fontSize = '14px';
    ruler.style.lineHeight = '1.6em';

    ruler.style.overflowWrap = 'break-word';
    ruler.style.tabSize = 'inherit';
    ruler.style.whiteSpace = 'pre-wrap';

    document.body.appendChild(ruler);
    const rulerHeight = ruler.offsetHeight;
    document.body.removeChild(ruler);
    const actualLineHeight = parseInt(window.getComputedStyle(actual).lineHeight, 10);
    const answer = Math.floor(rulerHeight / actualLineHeight);
    return answer;
  }

  function copyEvent(event) {
    const text = event.target.innerText;
    navigator.clipboard.writeText(text);
  }

  let breakCount = 0;
  for (const [index, line] of lines.entries()) {
    const rows = calculateRows(line);
    for (let i = 0; i < rows - 1; i++) {
      solutions.push(
        <p key={'break-' + (breakCount++)} className='ellipsis solution-wrapper'>
          <br />
        </p>
      );
    }
    let output;
    try {
      const noCommas = line.replace(/(\d),(?=\d{3}\b)/g, '$1');
      output = evaluate(noCommas, scope);
    } catch (e) { /* ignored */ }
    const formatted = (typeof output === 'number')
      ? Math.round(output * 100) / 100
      : JSON.stringify(output);
    const solution = (formatted === undefined)
      ? <br />
      : (
        <span className='solution' onClick={copyEvent}>
          {formatted}
        </span>
      );
    solutions.push(
      <p key={index} className='ellipsis solution-wrapper'>
        {solution}
      </p>
    );
  }

  return <>{solutions}</>;
}

export default Solutions;
