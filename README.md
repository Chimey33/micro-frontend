# Description
This is a sample app that demonstrates how one might go about running micro-frontends with an application shell.
It contains two apps
1. The first is the application shell (top level router)
2. The second a generic app with a couple of remote components
3. A third (facebook) has been provided to demonstrate use of an external service that cannot be embedded

Application one can be run as a standalone application or as part of the application shell which could be set up to 
navigate around several standalone frontends.

More details can be found under the description for each

## App Shell
This app acts as a top level router which allows for navigation between micro frontends.
Business logic should be kept to a minimum in this app.
- **NOTE** - tests have been written, but more work may be needed for desired operation


### App set up

```shell script
cd cd application-shell/webui/
nvm use
yarn install
```

### Register a service
Steps:
1. Add a `remoteEntry` to the ModuleFederationPlugin for the service to the `webpack.dev.js` and `webpack.prod.js` files:
    ```javascript
   const moduleFederationConfig = require('./moduleFederation');
   
   ...
   
   moduleFederationConfig.remotes = {
       <service-alias>: '<service-alias>@/<service-context-path>/remoteEntry.js',
   };
    ```
2. Add an entry to the Service array `src/bootstrap.tsx`
  - Ideally this would be loaded from a configuration endpoint or config file somewhere


3. Add the `exposes` configuration to the **remote** service's `moduleFederation.js` file.
    ```javascript
   new ModuleFederationPlugin({
            name: "myService",
            filename: "remoteEntry.js",
            exposes: {
                './<remote-alias>': './src/MyService'
            },
            shared: [],
   })
    ```


4. Add path to the `src/types/dynamicImports.d.ts` file.
    ```javascript
    declare module '<service-alias>/<remote-alias>';
    ```


5. Use the same path as above and add it to the list of known paths `componentImports.ts`.
    ```javascript
   '<service-alias>/<remote-alias>': () => import('<service-alias>/<remote-alias>')
   ```

### Run the application
- Complete the steps above and the run the following command

```shell script
yarn run start
```

### To access standalone
http://localhost:8080/

### Running application

![App shell.png](application-one%2Fimages%2FApp%20shell.png)


## App one
- This is a placeholder app that could represent any micro-front end running as part of the application shell.
- As such no testing or documentation has been added as this will likely change
- It can be run either standalone or as an embedded application
- Internal routing can be accessed via the side nav to the left of the screen (those pages contain dummy data)

  
### App set up

```shell script
cd cd application-one/webui/
nvm use
yarn install
```

### Setup
Within `./config/webpack.common.js`
- Update the `.app-one` css prefix string to a prefix chosen for your application
  - e.g `.app`

Within `./config/webpack.prod.js`
- Update the `<context-path>` to be that of your application. This should match the rest api context-path.

Within `./src/constants/NamespacingConstants`
- Update the `APPLICATION_PREFIX` value to match the prefix defined in `./config/webpack.common.js`
  - e.g `appOne`

### Run the application
```shell script
yarn run start
```
### To access standalone
http://localhost:8081/

### Standalone

![standalone.png](application-one%2Fimages%2Fstandalone.png)

## Embedded

![Embedded.png](application-one%2Fimages%2FEmbedded.png)

Complete the steps above and visit http://localhost:8080/


Once at the landing screen the embedded app can be navigated to via the menu in the right hand corner of the screen