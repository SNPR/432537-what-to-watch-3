import * as React from "react";
import { MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH } from "../../utils/constants";

const withFormValidation = Component => {
  class WithFormValidation extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFormInvalid: true,
        isSubmitError: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmitError = this.handleSubmitError.bind(this);
    }

    handleChange({ target: { value } }) {
      this.setState({
        isFormInvalid:
          value.length < MIN_REVIEW_LENGTH || value.length > MAX_REVIEW_LENGTH
      });
    }

    handleSubmitError() {
      this.setState({
        isSubmitError: !this.state.isSubmitError
      });
    }

    render() {
      const { isFormInvalid, isSubmitError: isSubmitError } = this.state;

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
