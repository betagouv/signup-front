import React from 'react'

const SearchSiret = () => (
  <div className='form__container'>
    <div className='form__group'>
      <label htmlFor='search'>Rechercher une donnée :</label>
      <div className='search__group'>
        <input type='text' className=' value=' name='search' id='search' />
        <button className='overlay-button' aria-label='Recherche'>
          <svg className='icon icon-search'><use xlinkHref='#icon-search' /></svg>
        </button>
      </div>
    </div>

    <style jsx>{`
      label {
        color: #fff;
      }
    `}</style>
  </div>
)

export default SearchSiret
