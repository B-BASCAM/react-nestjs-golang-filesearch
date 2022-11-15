import Keycloak from "keycloak-js";
const keycloakInstance = new Keycloak();
/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */

const Login = (onAuthenticatedCallback: Function) => {
    console.log(keycloakInstance);
    
  keycloakInstance
    .init({ onLoad: "login-required" })
    .then(function (authenticated) {
      console.log(keycloakInstance.token)
      authenticated ? onAuthenticatedCallback() : alert("non authenticated");
    })
    .catch((e) => {
      console.dir(e);
      console.log(`keycloak init exception: ${e}`);
    });
    
};

const Pbik = () => keycloakInstance.tokenParsed?.preferred_username;
const UserName = () => keycloakInstance.tokenParsed?.name;
const Email = () => keycloakInstance.tokenParsed?.email;

const Logout = keycloakInstance.logout;

const isLoggedIn = () => !!keycloakInstance.token;

const getToken = () => keycloakInstance.token;

const doLogin = keycloakInstance.login;

const updateToken = (successCallback: any) =>
  keycloakInstance.updateToken(5).then(successCallback).catch(doLogin);

const KeyCloakService = {
  CallLogin: Login,
  GetUserName : UserName,
  GetUserPbik : Pbik,
  GetUserEmail : Email,
  CallLogout : Logout,
  IsLoggedIn: isLoggedIn,
  GetToken: getToken,
  UpdateToken: updateToken,
};

export default KeyCloakService;