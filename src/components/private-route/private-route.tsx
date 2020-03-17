import * as React from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../utils/constants";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";

type PrivateRouteProps = RouteProps & {
  authorizationStatus: string;
  render: (props: RouteProps) => React.ReactNode;
};

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (
    props: PrivateRouteProps
) => {
  const {render, path, exact, authorizationStatus} = props;
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

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
