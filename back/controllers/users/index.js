const createUser = require('./createUser');
const loginUser = require('./loginUser');
const validateUser = require('./validateUser');
const validateEmail = require('./validateEmail');
const editUser = require('./editUser');
const editPassword = require('./editPassword');
const getMemberList = require('./getMemberList');

module.exports = {
  createUser,
  loginUser,
  validateUser,
  validateEmail,
  editUser,
  editPassword,
  getMemberList,
};
