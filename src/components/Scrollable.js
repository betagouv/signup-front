import React, { Component } from 'react';
import { delay, throttle } from 'lodash';
import PropTypes from 'prop-types';

import Spinner from './icons/spinner';

const getWindowHash = () =>
  window.location.hash ? window.location.hash.substr(1) : null;

export class ScrollablePanel extends Component {
  constructor(props) {
    super(props);
    this.panelRef = React.createRef();
  }

  handleScroll = throttle(() => {
    const offsetTop = this.panelRef.current.offsetTop;
    const offsetBottom = offsetTop + this.panelRef.current.offsetHeight;
    const hash = getWindowHash();

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
            <div className="section-full-page">
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
    const hash = getWindowHash();
    if (!this.state.selected && this.props.scrollableId === hash) {
      this.setState({ selected: true });
    }
    if (this.state.selected && this.props.scrollableId !== hash) {
      this.setState({ selected: false });
    }
    // approx 8 frames
  }, 16 * 8);

  componentDidMount() {
    // Hackish way to trigger initial scroll.
    // As it's difficult to determine when all ScrollablePanels are fully rendered,
    // we suppose that after 500ms this is the case to avoid complex implementation.
    // Then we simply trigger the link by clicking on it.
    delay(() => {
      const hash = getWindowHash() || 'head';
      if (!this.state.selected && this.props.scrollableId === hash) {
        document
          .querySelector(`.side-menu a[href="#${this.props.scrollableId}"]`)
          .click();
      }
    }, 500);

    return window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.handleScroll.cancel();
    return window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { scrollableId, children, style } = this.props;

    return (
      <li>
        <a
          className={`side-pane__link${this.state.selected ? ' active' : ''}`}
          href={`#${scrollableId}`}
          style={style}
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
  style: PropTypes.object,
};
