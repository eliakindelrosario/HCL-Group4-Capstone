export default {
	oidc: {
		clientId: "{OKTA ID APP 1}",
		issuer: "https://{OKTA DOMAIN APP 1}/oauth2/default",
		redirectUri: "https://localhost:4200/login/callback",
		scopes: ["openid", "profile", "email"],
	},
};
