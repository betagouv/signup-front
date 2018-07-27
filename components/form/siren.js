import React from 'react'
import PropTypes from 'prop-types'
import {debounce} from 'lodash'
import {getSirenInformation} from '../../lib/services'
import SearchIcon from '../icons/search'

class Siren extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      nom_raison_sociale: '',
      adresse: '',
      activite_principale: '',
      sirenNotFound: ''
    }

    this.getSiren = this.getSiren.bind(this)
    this.handleSirenChange = this.handleSirenChange.bind(this)
  }

  componentDidMount() {
    if (this.props.siren) {
      this.debouncedGetSiren(this.props.siren)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.siren !== prevProps.siren) {
      this.debouncedGetSiren(this.props.siren)
    }
  }

  getSiren(siren) {
    const sirenWithoutSpaces = siren.replace(/ /g, '')

    getSirenInformation(sirenWithoutSpaces).then(({nom_raison_sociale, adresse, activite_principale}) => {
      this.setState(({nom_raison_sociale, adresse, activite_principale, sirenNotFound: false}))
    }).catch(() => {
      this.setState(({nom_raison_sociale: '', adresse: '', activite_principale: '', sirenNotFound: true}))
    })
  }

  debouncedGetSiren = debounce(this.getSiren, 1000)

  handleSirenChange(event) {
    const siren = event.target.value

    this.props.handleSirenChange({siren})
  }

  render() {
    const {disabled, siren} = this.props
    const {nom_raison_sociale, adresse, activite_principale, sirenNotFound} = this.state

    return (
      <React.Fragment>
        <div className='form__group'>
          <label htmlFor='search-siren'>Rechercher votre organisme avec son SIREN</label>
          <div className='search__group'>
            <input type='text' value={siren} name='siren' id='search-siren' disabled={disabled} onChange={this.handleSirenChange} />
            <button className='overlay-button' type='button' aria-label='Recherche' onClick={this.getSiren}>
              <SearchIcon id='icon-search' title='Rechercher' />
            </button>
          </div>
        </div>

        {sirenNotFound &&
          <div className='form__group'>
            <div className='notification error'>Notre service ne parvient pas à trouver votre SIREN</div>
          </div>
        }

        <div className='form__group'>
          <label htmlFor='nom_raison_sociale'>Raison sociale</label>
          <input type='text' id='nom_raison_sociale' disabled value={nom_raison_sociale} />
        </div>
        <div className='form__group'>
          <label htmlFor='adresse'>Adresse</label>
          <input type='text' id='adresse' disabled value={adresse} />
        </div>
        <div className='form__group'>
          <label htmlFor='activite_principale'>Code NAF</label>
          <input type='text' id='activite_principale' disabled value={activite_principale} />
        </div>
      </React.Fragment>
    )
  }
}

Siren.propTypes = {
  siren: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  handleSirenChange: PropTypes.func.isRequired
}

Siren.defaultProps = {
  siren: ''
}

export default Siren
