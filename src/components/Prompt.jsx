import React from 'react';
import PropTypes from 'prop-types';

export default class Prompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
  }

  handleInputChange = event => {
    event.preventDefault();

    this.setState({ input: event.target.value });
  };

  handleAccept = event => {
    event.preventDefault();

    this.props.onAccept(this.state.input);
  };

  handleCancel = event => {
    event.preventDefault();

    this.props.onCancel();
  };

  render() {
    const { promptMessage } = this.props;
    const { input } = this.state;

    return (
      <div className="modal__backdrop" id="modal" style={{ display: 'flex' }}>
        <div className="modal">
          <p>{promptMessage}</p>
          <textarea value={input} onChange={this.handleInputChange} />
          <div className="form__group button__group">
            <a className="button" href="#validate" onClick={this.handleAccept}>
              Valider
            </a>
            <a
              className="button secondary"
              href="#cancel"
              onClick={this.handleCancel}
            >
              Annuler
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Prompt.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  promptMessage: PropTypes.string.isRequired,
};
