import React from 'react'
import DataSetDescription from './data-set-description'

const DataSet = ({props}) => (
  props.availables_data_sets.map(dataSet => <DataSetDescription key={dataSet.key} dataset={dataSet} />) // eslint-disable-line react/destructuring-assignment
)

export default DataSet
