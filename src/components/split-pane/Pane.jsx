import './Pane.css';

function Pane(props) {
  return (
    <div className='Pane'>{ props.children }</div>
  );
}

export default Pane;
