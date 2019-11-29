import React, { Component } from 'react';
import { throttle } from 'lodash';
import PropTypes from 'prop-types';

import Spinner from '../icons/spinner';

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
    this.handleScroll.cancel();
    return window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { scrollableId, isLoading, children } = this.props;
    return (
      <div className="panel" id={scrollableId} ref={this.panelRef}>
        {isLoading ? (
          <div style={{ height: '150px' }}>
            <div className="loader">
              <Spinner />
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
}

ScrollablePanel.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  scrollableId: PropTypes.string.isRequired,
};

ScrollablePanel.defaultProps = {
  isLoading: false,
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
    this.handleScroll.cancel();
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
