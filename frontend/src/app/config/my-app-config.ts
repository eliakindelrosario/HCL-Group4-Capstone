export default {
	oidc: {
		clientId: "0oa448vv91flblgPW5d7",
		issuer: "https://dev-4073510.okta.com/oauth2/default",
		//redirectUri: 'http://localhost:4200/products/login/callback',
		//redirectUri: 'https://teal-panda.azurewebsites.net/login/callback',
		redirectUri: "https://tealpanda.azurewebsites.net/products/login/callback",
		scopes: ["openid", "profile", "email"],
	},
};
