import React from 'react'
import PropTypes from 'prop-types'
import DataSetDescription from './data-set-description'

const DataSet = ({data}) => (
  data.availables_data_sets.map(dataSet => <DataSetDescription key={dataSet.key} dataset={dataSet} provider={data.provider_short_name} />) // eslint-disable-line react/destructuring-assignment
)

DataSet.propTypes = {
  data: PropTypes.object.isRequired
}

export default DataSet
