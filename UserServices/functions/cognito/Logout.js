const UserPool = require('./UserPool');

async function logout() {
   const user = UserPool.getCurrentUser();
   if (user) {
      user.signOut();
   }
}

module.exports = logout;
