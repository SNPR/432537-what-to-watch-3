import * as React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AppRoute } from "../../utils/constants";
import { AuthorizationStatus } from "../../reducer/user/user";
import { getAuthorizationStatus } from "../../reducer/user/selectors";

const PrivateRoute = props => {
  const { render, path, exact, authorizationStatus } = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return authorizationStatus === AuthorizationStatus.AUTH ? (
          render(props)
        ) : (
          <Redirect push to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authorizationStatus: getAuthorizationStatus(state)
});

export { PrivateRoute };
export default connect(mapStateToProps)(PrivateRoute);
