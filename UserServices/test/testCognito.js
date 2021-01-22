const register = require('../functions/cognito/Register');
const login = require('../functions/cognito/Login');
const adminUserUpdate = require('../functions/cognito/AdminUserUpdate');
const confirmRegistration = require('../functions/cognito/ConfirmRegistration');

async function testLogin(loginWith) {
   let res = await login({
      username: loginWith,
      password: 'Jacob3Kim!',
   });

   console.log(res);
}

async function testRegister() {
   let res = await register({
      username: 'jacob.kim3',
      password: 'Jacob3Kim!',
      email: 'kjkjkjhan424@gmail.com',
      phonenumber: '',
   });

   console.log(res);
}

async function testAdminUserUpdate(username, name, value) {
   let res = await adminUserUpdate(username, name, value);

   console.log(res);
}

async function testConfirmRegistration() {
   let res = await confirmRegistration({
      username: 'jacob.kim3',
      code: '416694',
   });

   console.log(res);
}

// testConfirmRegistration();
// testLogin('jacob.kim3');
// testLogin('kjkjkjhan424@gmail.com');
// testLogin('s@s');
// testAdminUserUpdate('jacob.kim2', 'email_verified', 'true');
