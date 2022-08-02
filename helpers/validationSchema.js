const JOI = require("@hapi/joi");

const authSchema = JOI.object({
  username: JOI.string().lowercase(),
  email: JOI.string().email().lowercase().required(),
  password: JOI.string().min(2).required(),
  role: JOI.string().lowercase(),
});

module.exports = { authSchema };
