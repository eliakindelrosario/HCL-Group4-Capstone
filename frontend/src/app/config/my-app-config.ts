export default {
  oidc: {
    clientId: '0oa448vv91flblgPW5d7',
    issuer: 'https://dev-4073510.okta.com/oauth2/default',
    //redirectUri: 'https://localhost:4200/login/callback',
    //redirectUri: 'https://teal-panda.azurewebsites.net/login/callback',
    redirectUri: 'tealpanda.azurewebsites.net/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
};
