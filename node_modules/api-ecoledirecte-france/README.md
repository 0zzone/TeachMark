# API ÉCOLEDIRECTE FRANCE

Sample code to get access to the API:
```js
const api = require("api-ecoledirecte-france")

api.login("username", "password")
    .then((token) => {
        console.log(token) // Useful to access to the API...
    })
    .catch((err) => {
        throw err
    })

api.accounts("username", "password")
    .then((accounts) => {
        console.log(accounts)
    })
    .catch((err) => {
        throw err
    })
```