
var O365 = {
        clientId: '76d3e131-1bc0-45c9-a0f7-378854986ac4',
        authUri: 'https://login.microsoftonline.com/common/',
        redirectUri: 'http://localhost:4400/services/office365/redirectTarget.html',
        domain: 'jabadahut.onmicrosoft.com',
        tenantId: 'ab7d4fc3-50c3-4e02-a1fa-30cea218b63b'
};


var O365Auth;
(function (O365Auth) {
    (function (Settings) {
        Settings.clientId = '76d3e131-1bc0-45c9-a0f7-378854986ac4';
        Settings.authUri = 'https://login.windows.net/common/';
        Settings.redirectUri = 'http://localhost:4400/services/office365/redirectTarget.html';
    })(O365Auth.Settings || (O365Auth.Settings = {}));
    var Settings = O365Auth.Settings;
})(O365Auth || (O365Auth = {}));