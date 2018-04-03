import React from 'react'
import Head from 'next/head'
import Embed from 'react-runkit'
import PropTypes from 'prop-types'
import TryMeButton from './try-me-button'
import LinkButton from './link-button'
import Services from './services'

class DataSetDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {opened: false}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      opened: !prevState.opened
    }))
  }

  render() {
    const {dataset, provider} = this.props
    const {opened} = this.state

    return (
      <div className='panel'>
        <Head>
          <script src='https://embed.runkit.com' />
        </Head>
        <div className='panel__header'>
          <h3>{dataset.human_name}</h3>
          <small className='panel__header-extra'>{provider.short_name}</small>
        </div>
        <div>
          <p>{dataset.description}</p>
          {
            dataset.services ? <Services lists={dataset.services} /> : null
          }

        </div>

        <div className='panel__actions'>
          {
            dataset.node_example ? <TryMeButton handleClick={this.handleClick} /> : null
          }
          {
            provider.type === 'apiParticulier' ? <LinkButton url='/contractualisation' text='Demander un accès' /> : <LinkButton url='/contractualisation-fc' text='Demander un accès' />
          }

        </div>

        {
          opened ?
            <div className='panel__footer'>
              <Embed source={dataset.node_example} />
            </div> : null
        }

      </div>
    )
  }
}

DataSetDescription.propTypes = {
  dataset: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired
}

export default DataSetDescription
