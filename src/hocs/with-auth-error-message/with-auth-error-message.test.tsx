import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withAuthErrorMessage from "./with-auth-error-message";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withAuthErrorMessage(MockComponent);

it(`Should change error message on error`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().authErrorMessage).toEqual(``);

  wrapper.instance().handleErrorMessage(`Error text`);

  expect(wrapper.props().authErrorMessage).toEqual(`Error text`);
});
