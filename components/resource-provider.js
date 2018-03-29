import React from 'react'
import PropTypes from 'prop-types'
import Section from '../components/section'
import DataSetDescription from '../components/data-set-description'

class ResourceProvider extends React.Component {
  render() {
    const {resourceProvider} = this.props
    let i = 0

    return (
      <Section className='section-grey'>
        <div className='container'>
          <h2 className='section__title'>Données issues de la <abbr title={resourceProvider.long_name}>{resourceProvider.short_name}</abbr></h2>
          <p className='section__subtitle'>{resourceProvider.description}</p>
          {
            resourceProvider.scopes.map(dataSet => {
              return (
                <DataSetDescription key={'dataSet' + i++} dataset={dataSet} provider={resourceProvider} />
              )
            })
          }
        </div>
      </Section>
    )
  }
}

ResourceProvider.propTypes = {
  resourceProvider: PropTypes.object.isRequired
}

export default ResourceProvider
