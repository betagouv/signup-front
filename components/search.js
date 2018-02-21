import React from 'react'

const Search = () => (
  <div className='form__group'>
    <label htmlFor='search'>Tapez un mot-clef :</label>
    <div className='search__group'>
      <input type='text' className=' value=' name='search' id='search' />
      <button className='overlay-button' aria-label='Recherche'>
        <svg className='icon icon-search'><use xlinkHref='#icon-search' /></svg>
      </button>
    </div>
  </div>
)

export default Search
