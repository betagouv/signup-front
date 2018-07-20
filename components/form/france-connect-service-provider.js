import {FRANCE_CONNECT_AUTHORIZE_URI, FRANCE_CONNECT_CREATE_SERVICE_PROVIDER_URI} from '@env'
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {getQueryVariable} from '../../lib/utils'
import Services from '../../lib/services'

class FranceConnectServiceProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      serviceProviders: [],
      serviceProvidersSelectedIndex: '',
      noServiceProviders: false,
      isServiceProvidersLoading: true
    }

    this.handleServiceProviderChange = this.handleServiceProviderChange.bind(this)
  }

  componentDidMount() {
    const tokenFc = getQueryVariable('token')

    if (tokenFc) {
      Services.getServiceProviders(tokenFc)
        .then(serviceProviders => {
          this.setState({serviceProviders, isServiceProvidersLoading: false})

          if (serviceProviders.length === 0) {
            return this.setState({noServiceProviders: true})
          }

          const serviceProviderIndex = serviceProviders.findIndex(({key}) => this.props.fournisseur_de_service === key)
          const initialIndex = serviceProviderIndex >= 0 ? serviceProviderIndex : 0

          const {name: intitule, key: fournisseur_de_service, description} = serviceProviders[initialIndex]
          this.props.onServiceProviderChange({intitule, description, fournisseur_de_service})

          return this.setState({
            serviceProvidersSelectedIndex: initialIndex,
            noServiceProviders: false
          })
        })
        .catch(() => this.setState({isServiceProvidersLoading: false}))
    } else {
      this.setState({isServiceProvidersLoading: false})
    }
  }

  handleServiceProviderChange(event) {
    const serviceProviderIndex = event.target.value
    const {name: intitule, key: fournisseur_de_service, description} = this.state.serviceProviders[serviceProviderIndex]

    this.setState({serviceProvidersSelectedIndex: serviceProviderIndex})
    this.props.onServiceProviderChange({intitule, description, fournisseur_de_service})
  }

  render() {
    const {serviceProviders, serviceProvidersSelectedIndex, noServiceProviders, isServiceProvidersLoading} = this.state

    if (isServiceProvidersLoading) {
      return <div className='form__group'><h4>Chargement des fournisseur de service...</h4></div>
    }

    return (
      <React.Fragment>
        <div className='form__group'>
          <h4 id='france-connect'>Partenaire FranceConnect</h4>
          <p><Link href={FRANCE_CONNECT_AUTHORIZE_URI}><a className='button'>Se connecter auprès de France Connect afin de récupérer mes démarches</a></Link></p>
        </div>
        {serviceProviders.length > 0 &&
          <div className='form__group'>
            <label htmlFor='fournisseur_de_service'>Fournisseurs de service FranceConnect</label>
            <select onChange={this.handleServiceProviderChange} id='fournisseur_de_service' value={serviceProvidersSelectedIndex}>
              {serviceProviders.map(({name, key}, index) => (
                <option key={key} value={index}>{name}</option>
              ))}
            </select>
          </div>
        }
        {noServiceProviders &&
          <div className='form__group'>
            <div className='notification error'>Veuillez <a target='_blank' rel='noopener noreferrer' href={FRANCE_CONNECT_CREATE_SERVICE_PROVIDER_URI}>créer un fournisseur de service</a> avant de demander un accès</div>
          </div>
        }
      </React.Fragment>
    )
  }
}

FranceConnectServiceProvider.propTypes = {
  onServiceProviderChange: PropTypes.func.isRequired,
  fournisseur_de_service: PropTypes.string
}

FranceConnectServiceProvider.defaultProps = {
  fournisseur_de_service: ''
}

export default FranceConnectServiceProvider
