import './Tabs.css';

function Tabs() {
  return (
    <div className='bar tab-bar'>
      <p className='ellipsis tab'>Tab 1 <span className='tab-close'>✕</span></p>
      <p className='ellipsis tab'>Tab 2 <span className='tab-close'>✕</span></p>
      <p className='ellipsis tab'>Tab 3 <span className='tab-close'>✕</span></p>
    </div>
  )
}

export default Tabs;
