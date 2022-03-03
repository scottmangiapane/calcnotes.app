import { createRef, useEffect, useState } from 'react';

import './SplitPane.css';

function SplitPane({ left, right }) {
  const leftPaneRef = createRef();
  const dividerRef = createRef();
  const rightPaneRef = createRef();
  const [mouseDown, setMouseDown] = useState(false);
  const [mouse, setMouse] = useState({});

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  });

  function onMouseDown(event) {
    setMouseDown(true);
    setMouse({
      event,
      offsetLeft: dividerRef.current.offsetLeft,
      offsetTop: dividerRef.current.offsetTop,
      firstWidth: leftPaneRef.current.offsetWidth,
      secondWidth: rightPaneRef.current.offsetWidth
    });
  }

  function onMouseMove(event) {
    if (mouseDown) {
      const delta = {
        x: event.clientX - mouse.event.clientX,
        y: event.clientY - mouse.event.clientY
      };
      delta.x = Math.min(Math.max(delta.x, -mouse.firstWidth), mouse.secondWidth);
      const totalPercent = mouse.firstWidth + mouse.secondWidth;
      const leftPercent = 100 * (mouse.firstWidth + delta.x) / totalPercent;
      const rightPercent = 100 * (mouse.secondWidth - delta.x) / totalPercent;
      leftPaneRef.current.style.width = leftPercent + '%';
      rightPaneRef.current.style.width = rightPercent + '%';
    }
  }

  function onMouseUp() {
    setMouseDown(false);
  }

  return (
    <div className='SplitPane'>
      <div ref={ leftPaneRef } className='pane pane-left'>{ left }</div>
      <div
        ref={ dividerRef }
        className='divider'
        onMouseDown={ onMouseDown }>
        <div></div>
      </div>
      <div ref={ rightPaneRef } className='pane pane-right'>{ right }</div>
    </div>
  );
};

export default SplitPane;
