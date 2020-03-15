import * as React from "react";
import { Tab } from "../../utils/constants.js";

const withActiveTab = Component => {
  class WithActiveTab extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = { selectedTab: Tab.Name.OVERVIEW };

      this.getActiveClass = this.getActiveClass.bind(this);
      this.setActiveTab = this.setActiveTab.bind(this);
    }

    getActiveClass(tabName) {
      return this.state.selectedTab === tabName ? Tab.ACTIVE_CLASS : ``;
    }

    setActiveTab(tabName) {
      this.setState({ selectedTab: tabName });
    }

    render() {
      const { selectedTab } = this.state;

      return (
        <Component
          {...this.props}
          selectedTab={selectedTab}
          getActiveClass={this.getActiveClass}
          setActiveTab={this.setActiveTab}
        />
      );
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
