import React from 'react'
import Head from 'next/head'
import Embed from 'react-runkit'
import PropTypes from 'prop-types'
import TryMeButton from './try-me-button'
import AddToSelectionButton from './add-to-selection-button'
import Services from './services'

class DataSetDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = { opened: false }
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
          <script src='https://embed.runkit.com'></script>
        </Head>
        <div className='panel__header'>
          <h3>{dataset.name}</h3>
          <small className='panel__header-extra'>{provider}</small>
        </div>
        <div>
          <p>{dataset.description}</p>
          <Services lists={dataset.services} />
        </div>

        <div className='panel__actions'>
          <TryMeButton handleClick={this.handleClick} />
          <AddToSelectionButton buttonKey={dataset.key} />
        </div>

        {
          opened ?
            <div className='panel__footer'>
              <Embed source={dataset.node_example} />
            </div>
          :
            null
        }

      </div>
    )
  }
}

DataSetDescription.propTypes = {
  dataset: PropTypes.object.isRequired,
  provider: PropTypes.string.isRequired
}

export default DataSetDescription
