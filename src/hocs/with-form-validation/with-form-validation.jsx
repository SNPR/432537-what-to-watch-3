import React, {PureComponent} from "react";
import {MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH} from "../../utils/constants.js";

const withFormValidation = (Component) => {
  class WithFormValidation extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFormInvalid: true
      };

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange({target: {value}}) {
      this.setState({
        isFormInvalid:
          value.length < MIN_REVIEW_LENGTH || value.length > MAX_REVIEW_LENGTH
      });
    }

    render() {
      const {isFormInvalid} = this.state;

      return (
        <Component
          {...this.props}
          isFormInvalid={isFormInvalid}
          onReviewTextChange={this.handleChange}
        />
      );
    }
  }

  return WithFormValidation;
};

export default withFormValidation;
