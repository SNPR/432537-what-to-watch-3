import * as React from "react";
import {Subtract} from "utility-types";

type InjectingProps = {
  authErrorMessage: string;
  onError: (err: string) => void;
};

type withAuthErrorMessageState = {
  authErrorMessage: string;
};

const withAuthErrorMessage = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithAuthErrorMessage extends React.PureComponent<
    T,
    withAuthErrorMessageState
  > {
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
