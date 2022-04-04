# HCL-Capstone-Project-Group


## Setup Angular

After cloning the repo, make sure to install all angular dependencies

```
cd frontend
npm install
```

## File To Create

-   Backend - src/main/resources/application.properties

```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/tealpanda?useSSL=false&useUnicode=yes&characterEncoding=UTF-8&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=[DB USERNAME]
spring.datasource.password=[DB PASSWORD]


spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

spring.data.rest.base-path=/api

allowed.origins=https://localhost:4200

spring.data.rest.detection-strategy=ANNOTATED


okta.oauth2.client-id=[OKTA CLIENT ID APP 2]
okta.oauth2.client-secret=[OKTA CLIENT SECRET APP 2]
okta.oauth2.issuer=[OKTA DOMAIN APP 1]


#####
#
# HTTPS configuration
#
#####

# Server web port
#server.port=8443
server.port=9898

# Enable HTTPS support (only accept HTTPS requests)
server.ssl.enabled=true

# Alias that identifies the key in the key store
server.ssl.key-alias=luv2code

# Keystore location
server.ssl.key-store=classpath:luv2code-keystore.p12

# Keystore password
server.ssl.key-store-password=[SECRET PASSWORD]

# Keystore format
server.ssl.key-store-type=PKCS12


#####
#
# Payment Processing with Stripe
#
#####

stripe.key.secret=[STRIPE SECRETE KEY]

```

-   Frontend - src/app/config/my-app-config.ts

```
export default {
	oidc: {
		clientId: "{OKTA ID APP 1}",
		issuer: "https://{OKTA DOMAIN APP 1}/oauth2/default",
		redirectUri: "https://localhost:4200/login/callback",
		scopes: ["openid", "profile", "email"],
	},
};

```

-   Frontend - src/environments/environment.ts

```
export const environment = {
	production: false,
	luv2ShopApiUrl: "https://localhost:8443/api",
	stripePublishableKey: "",
};
```



# Add SonarCloud 

