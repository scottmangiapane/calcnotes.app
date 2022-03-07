import './Titlebar.css';

function Titlebar() {
  const sourceUrl = 'https://github.com/scottmangiapane/calcnotes';

  return (
    <p className='titlebar'>
      <span className='titlebar-item'></span>
      <span className='titlebar-item'>
        <span>CalcNotes</span>
      </span>
      <span className='titlebar-item titlebar-item-right'>
        <a href={ sourceUrl } target='_blank'>&lt;/&gt;</a>
      </span>
    </p>
  )
}

export default Titlebar;
