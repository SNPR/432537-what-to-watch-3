import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveTab from "./with-active-tab.jsx";
import {Tab} from "../../utils/constants.js";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveTab(MockComponent);

it(`Should change current tab`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().selectedTab).toEqual(Tab.Name.OVERVIEW);

  wrapper.instance().setActiveTab(Tab.Name.DETAILS);

  expect(wrapper.props().selectedTab).toEqual(Tab.Name.DETAILS);
});

it(`Should get correct active class`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().selectedTab).toEqual(Tab.Name.OVERVIEW);

  expect(wrapper.instance().getActiveClass(Tab.Name.OVERVIEW)).toEqual(
      Tab.ACTIVE_CLASS
  );
  expect(wrapper.instance().getActiveClass(Tab.Name.DETAILS)).toEqual(``);
});
