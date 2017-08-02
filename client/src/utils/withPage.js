import React from 'react';
import { Loader } from 'semantic-ui-react';
import _ from 'lodash';

export default function withPage(nodePath) {
  return function(Component) {
    return class PageContainer extends React.PureComponent {
      static displayName = `page(${Component.displayName || Component.name || 'Component'})`;

      render() {
        if (this.props.data.loading) {
          return <Loader active inline="centered" />;
        }

        if (nodePath && !_.get(this.props.data, nodePath)) {
          return <strong>404</strong>;
        }

        return <Component {...this.props}/>
      }
    };
  };
}
