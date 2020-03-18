import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer
} from "./user";
import {noop} from "../../utils/utils";

const api = createAPI(noop);

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``
  });
});

it(`Reducer update authorization status`, () => {
  expect(
      reducer(
          {
            authorizationStatus: AuthorizationStatus.NO_AUTH,
            avatarUrl: ``
          },
          {
            type: ActionType.REQUIRE_AUTHORIZATION,
            payload: AuthorizationStatus.AUTH
          }
      )
  ).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``
  });
});

it(`Should make a correct API call to /login`, function () {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const login = Operation.login({
    login: `test@123.com`,
    password: `qweasd`
  });

  apiMock.onPost(`/login`).reply(200, []);

  return login(dispatch, noop, api).then(() => {
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(
        ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)
    ).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH
    });

    expect(
        ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)
    ).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
  });
});
