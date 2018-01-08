import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import insertCss from './insertCss';


function withStyles(...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class WithStyles extends Component {
      componentWillMount() {
        const removeCss = styles.map(x => (x._insertCss ? x._insertCss({}, insertCss) : () => {})); // eslint-disable-line no-underscore-dangle, max-len

        this.removeCss = () => { removeCss.forEach(f => f()); };
      }

      componentWillUnmount() {
        if (this.removeCss && typeof this.removeCss === 'function') {
          setTimeout(this.removeCss, 0);
        }
      }

      render() {
        return <ComposedComponent {...this.props} />;
      }
    }

    const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

    WithStyles.displayName = `WithStyles(${displayName})`;
    WithStyles.ComposedComponent = ComposedComponent;

    return hoistStatics(WithStyles, ComposedComponent);
  };
}

export default withStyles;
