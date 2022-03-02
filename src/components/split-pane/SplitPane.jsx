import './SplitPane.css';

function SplitPane(props) {
  return (
    <div className='SplitPane'>{ props.children }</div>
  );
}

export default SplitPane;
