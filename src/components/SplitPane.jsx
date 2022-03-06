import { createRef, useContext, useEffect, useState } from 'react';

import { AppContext } from './App';

import './SplitPane.css';

function SplitPane({ left, right }) {
  const dividerRef = createRef();
  const leftPaneRef = createRef();
  const rightPaneRef = createRef();
  const { dispatch } = useContext(AppContext);
  const [mouse, setMouse] = useState({});
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
    }
  });

  function onMouseDown(event) {
    setMouse({
      event,
      offsetLeft: dividerRef.current.offsetLeft,
      offsetTop: dividerRef.current.offsetTop,
      firstWidth: leftPaneRef.current.offsetWidth,
      secondWidth: rightPaneRef.current.offsetWidth
    });
    setMouseDown(true);
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
      onResize();
    }
  }

  function onMouseUp() {
    setMouseDown(false);
  }

  function onResize() {
    const editorWidth = leftPaneRef.current.offsetWidth;
    dispatch({ type: 'UPDATE_EDITOR_WIDTH', data: editorWidth });
  }

  return (
    <div className='split-pane'>
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
