const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("basic")
 .readOwn("profile")
 .updateOwn("profile")
 .readOwn("adherent")
 .updateOwn("adherent")

ac.grant("supervisor")
 .extend("basic")
 .readAny("profile")
 .readAny("adherent")
ac.grant("admin")
 .extend("basic")
 .extend("supervisor")
 .updateAny("profile")
 .deleteAny("profile")
 .updateAny("adherent")
 .deleteAny("adherent")
return ac;
})();