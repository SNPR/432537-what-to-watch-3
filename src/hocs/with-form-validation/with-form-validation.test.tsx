import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withFormValidation from "./with-form-validation";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withFormValidation(MockComponent);

it(`Should check form validation depending on input value length`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().isFormInvalid).toEqual(true);

  wrapper.instance().handleChange({
    target: {
      value: `Test test test Test test test Test test test Test test test`
    }
  });

  expect(wrapper.props().isFormInvalid).toEqual(false);

  wrapper.instance().handleChange({
    target: {
      value: `Test`
    }
  });

  expect(wrapper.props().isFormInvalid).toEqual(true);
});
