import React from 'react'
import PropTypes from 'prop-types'
import Section from '../components/section'
import DataSetDescription from '../components/data-set-description'

class ResourceProvider extends React.Component {
  render() {
    const {resourceProvider} = this.props
    let i = 0

    return (
      <Section className='section-grey section__subsection'>
        <div className='container'>
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
