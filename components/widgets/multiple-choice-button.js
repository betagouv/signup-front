import React from 'react'
import PropTypes from 'prop-types'

class MultipleChoiceButton extends React.Component {
  constructor(props) {
    super(props)

    this.setInsideRef = this.setInsideRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleClickOnToggleButton = this.handleClickOnToggleButton.bind(this)
    this.handleClickOnActionButtonFactory = this.handleClickOnActionButtonFactory.bind(this)
    this.state = {
      isExpanded: false
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setInsideRef(node) {
    this.insideRef = node
  }

  handleClickOutside(event) {
    if (this.insideRef && !this.insideRef.contains(event.target)) {
      this.setState({isExpanded: false})
    }
  }

  handleClickOnToggleButton(event) {
    event.stopPropagation()
    this.setState(({isExpanded: prevIsExpanded}) => ({isExpanded: !prevIsExpanded}))
  }

  handleClickOnActionButtonFactory(trigger) {
    return event => {
      event.stopPropagation()
      trigger()
    }
  }

  render() {
    const {actions} = this.props
    const {isExpanded} = this.state

    if (actions.length === 0) {
      return null
    }

    if (actions.length === 1) {
      return (
        <button
          className='button'
          name={actions[0].id}
          onClick={this.handleClickOnActionButtonFactory(actions[0].trigger)}
          style={{
            padding: '.5em',
            width: '160px',
            outline: '0'
          }}
        >{actions[0].label}</button>
      )
    }

    return (
      <div ref={this.setInsideRef} style={{position: 'relative'}}>
        <button
          className='button'
          name={actions[0].id}
          onClick={this.handleClickOnActionButtonFactory(actions[0].trigger)}
          style={{
            padding: '.5em',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            borderBottomLeftRadius: isExpanded ? '0' : '3px',
            width: '120px',
            outline: '0'
          }}
        >{actions[0].label}</button>
        <button
          className='button'
          onClick={this.handleClickOnToggleButton}
          style={{
            marginLeft: '0',
            padding: '.5em',
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: isExpanded ? '0' : '3px',
            width: '40px',
            outline: '0'
          }}
        >
          <span style={{
            borderTop: '.3em solid',
            borderRight: '.3em solid transparent',
            borderBottom: '0',
            borderLeft: '.3em solid transparent',
            width: '0',
            height: '0',
            marginLeft: '.255em',
            verticalAlign: '.255em',
            display: 'inline-block'
          }} />
        </button>
        <div
          style={{
            position: 'absolute',
            transform: 'translate3d(0px, 33px, 0px)',
            top: '0px',
            left: '0px',
            zIndex: '1000',
            display: isExpanded ? 'block' : 'none'
          }}
        >
          {actions.slice(1).map(({id, trigger, label}, index, array) => (
            <button
              key={id}
              name={id}
              className='button'
              onClick={this.handleClickOnActionButtonFactory(trigger)}
              style={{
                padding: '.5em',
                width: '160px',
                display: 'block',
                outline: '0',
                marginLeft: '0',
                borderTopLeftRadius: '0',
                borderTopRightRadius: '0',
                // Round bottom corner for last element
                borderBottomLeftRadius: index === array.length - 1 ? '3px' : '0',
                borderBottomRightRadius: index === array.length - 1 ? '3px' : '0'
              }}
            >{label}</button>
          ))}
        </div>
      </div>
    )
  }
}

MultipleChoiceButton.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      trigger: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired
    })
  )
}

MultipleChoiceButton.defaultProps = {
  actions: []
}

export default MultipleChoiceButton
