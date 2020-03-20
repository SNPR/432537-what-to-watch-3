import * as React from "react";
import {ReviewLength} from "../../utils/constants";
import {Subtract} from "utility-types";

type InjectingProps = {
  isFormInvalid: boolean;
  onReviewTextChange: (evt: React.SyntheticEvent<EventTarget>) => void;
  onSubmitError: () => void;
  isSubmitError: boolean;
};

type withAuthErrorMessageState = {
  isFormInvalid: boolean;
  isSubmitError: boolean;
};

const withFormValidation = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithFormValidation extends React.PureComponent<
    T,
    withAuthErrorMessageState
  > {
    constructor(props) {
      super(props);

      this.state = {
        isFormInvalid: true,
        isSubmitError: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmitError = this.handleSubmitError.bind(this);
    }

    handleChange({target: {value}}) {
      this.setState({
        isFormInvalid:
          value.length < ReviewLength.MIN || value.length > ReviewLength.MAX
      });
    }

    handleSubmitError() {
      this.setState({
        isSubmitError: !this.state.isSubmitError
      });
    }

    render() {
      const {isFormInvalid, isSubmitError: isSubmitError} = this.state;

      return (
        <Component
          {...this.props}
          isFormInvalid={isFormInvalid}
          onReviewTextChange={this.handleChange}
          onSubmitError={this.handleSubmitError}
          isSubmitError={isSubmitError}
        />
      );
    }
  }

  return WithFormValidation;
};

export default withFormValidation;
