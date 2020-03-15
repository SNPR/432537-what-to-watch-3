import * as React from "react";

const withAuthErrorMessage = (Component) => {
  class WithAuthErrorMessage extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        authErrorMessage: ``
      };

      this.handleErrorMessage = this.handleErrorMessage.bind(this);
    }

    handleErrorMessage(err) {
      this.setState({
        authErrorMessage: err
      });
    }

    render() {
      const {authErrorMessage} = this.state;

      return (
        <Component
          {...this.props}
          authErrorMessage={authErrorMessage}
          onError={this.handleErrorMessage}
        />
      );
    }
  }

  return WithAuthErrorMessage;
};

export default withAuthErrorMessage;
