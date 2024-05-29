import { Ability, AbilityBuilder } from "@casl/ability";

const policies = {
  guest(user, { can }) {
    can("read", "Product");
  },
  user(user, { can }) {
    can("read", "Product");
    can("view", "Order");
    can("create", "Order");
    can("read", "Order", { user_id: user._id });
    can("update", "User", { user_id: user._id });
    can("read", "Cart", { user_id: user._id });
    can("update", "Cart", { user_id: user._id });
    can("view", "DeliveryAddress");
    can("create", "DeliveryAddress", { user_id: user._id });
    can("update", "DeliveryAddress", { user_id: user._id });
    can("delete", "DeliveryAddress", { user_id: user._id });
    can("read", "Invoice", { user_id: user._id });
  },
  admin(user, { can }) {
    can("manage", "all");
  },
};

export const policyFor = (user) => {
  let builder = new AbilityBuilder();
  if (user && typeof policies[user.role] === "function") {
    policies[user.role](user, builder);
  } else {
    policies["guest"](user, builder);
  }

  return new Ability(builder.rules);
};
