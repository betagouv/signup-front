import React, { Component } from 'react';
import { throttle } from 'lodash';
import PropTypes from 'prop-types';

export class ScrollablePanel extends Component {
  constructor(props) {
    super(props);
    this.panelRef = React.createRef();
  }

  handleScroll = throttle(() => {
    const averageHeaderHeight = 76;
    const offsetTop = this.panelRef.current.offsetTop + averageHeaderHeight;
    const offsetBottom = offsetTop + this.panelRef.current.offsetHeight;
    const hash = window.location.hash ? window.location.hash.substr(1) : null;

    if (
      hash !== this.props.scrollableId &&
      window.scrollY > offsetTop &&
      window.scrollY < offsetBottom
    ) {
      window.history.replaceState(
        undefined,
        undefined,
        `#${this.props.scrollableId}`
      );
    }
    // approx 8 frames
  }, 16 * 8);

  componentDidMount() {
    return window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    return window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { scrollableId, children } = this.props;
    return (
      <div className="panel" id={scrollableId} ref={this.panelRef}>
        {children}
      </div>
    );
  }
}

ScrollablePanel.propTypes = {
  children: PropTypes.node,
  scrollableId: PropTypes.string.isRequired,
};

ScrollablePanel.defaultProps = {
  children: null,
};

export class ScrollableLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  handleScroll = throttle(() => {
    const hash = window.location.hash ? window.location.hash.substr(1) : null;
    if (!this.state.selected && this.props.scrollableId === hash) {
      this.setState({ selected: true });
    }
    if (this.state.selected && this.props.scrollableId !== hash) {
      this.setState({ selected: false });
    }
    // approx 8 frames
  }, 16 * 8);

  componentDidMount() {
    return window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    return window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { scrollableId, children } = this.props;

    return (
      <li>
        <a
          className={`side-pane__link${this.state.selected ? ' active' : ''}`}
          href={`#${scrollableId}`}
        >
          {children}
        </a>
      </li>
    );
  }
}

ScrollableLink.propTypes = {
  scrollableId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
