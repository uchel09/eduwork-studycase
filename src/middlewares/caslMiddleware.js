import { policyFor } from "../utils/casl.js";
import { ResponseError } from "./responseError.js";

export function policy_check(action, subject) {
  return function (req, res, next) {
    console.log(res.locals.user)
    let policy = policyFor(res.locals.user);
    if (!policy.can(action, subject)) {
      next(
        new ResponseError(400, `you are not allowed to ${action} ${subject}`)
      );
      return;
    }
    next();
  };
}
