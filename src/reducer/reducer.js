import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as state} from "./state/state";
import {reducer as user} from "./user/user";
import Namespace from "./namespace";

export default combineReducers({
  [Namespace.DATA]: data,
  [Namespace.STATE]: state,
  [Namespace.USER]: user
});
