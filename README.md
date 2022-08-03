# vue-auth

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### notes to ian

the _browser_ stores cookies and sends them along with all HTTP requests. So somehow the browser needs to track the session id and send it alongside the authenticate user request...I don't need to pass that in manually.

it could be the case that the browser is wiping away my tokens and submitting new ones, which is why two sessions are created during my login in the VUE app.
