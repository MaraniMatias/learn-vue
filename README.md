# learn-vue

Aprender vuejs 2.5 material para la cátedra de TTADS, UTN-frro

Para ampliar los temas de esta guia sugiero ver la [documentación oficial de Vue](https://es-vuejs.github.io/vuejs.org/) o [en este repocitorio](https://github.com/MaraniMatias/vuejs-talk-2017)

## Requisitos previos

Instalar [nodeJS](https://nodejs.org/es/)

Instalar el cliente de Vue, [vue-cli](https://github.com/vuejs/vue-cli), con el tenemos diferentes plantillas para nuestros proyectos.

```sh
npm install -g vue-cli
```

## 1 - Ejemplo Simple

### Primer componente

La aplicación más simple que podemos construir con Vue en un solo archivo HTML.

```sh
# Crear un directorio donde vamos a trabajar
mkdir vue-simple
cd vue-simple

# En el directorio, creamos un archivo html
touch index.html
```

Incluimos el core de Vue `<script src="https://unpkg.com/vue"></script>`.

Crearemos un componente básico

En nuestro HTML incluimos las siguientes lines que pertenece a la estructura de nuestro componente

```html
  <template id="hello">
    <div>
      <h1>{{ message }}</h1>
      <input v-model="message">
    </div>
  </template>
```
En un archivo JavaScript `hello-component.js` con el siguiente contenido

```javascript
Vue.component('hello-component', {
  template: '#hello',
  data: function () {
    return {
      message: 'Welcome to your Vue.js app!'
    };
  }
});
```
Done `#hello` es el ID del elemento *template* incluido en el HTML

Para poder usar nuestro componente tenemos que hacer dos cosas primero incluir el archivo javascript en el HTML `<script src='./hello-component.js'></script>`.

Luego las etiquetas `<hello-component></hello-component>` donde usar nuestro componente, tiene que estar dentro del `<div id="app"></div>`

```html
  <div id="app">
    <hello-component></hello-component>
  </div>
```

También indicarle a Vue de donde comenzar a armar las estructura de nuestra app.

```html
  <script>
    new Vue({
      el: '#app'
    })
  </script>
```

### Agregamos un método a nuestro componente

En nuestro archivo javascript
```javascript
Vue.component('hello-component', {
  template: '#hello',
  data: function () {
    return { message: 'Welcome to your Vue.js app!' }
  },
  methods: {
    change: function(value) {
      this.message = "new " + value;
    }
  }
});
```

Para poder usar el método, lo usamos con el evento `click` del botón

```html
<template id="hello">
  <div>
    <h1>{{ message }}</h1>
    <button v-on:click="change('message')">change</button>
  </div>
</template>
```

## 2 - Ejemplo plantilla Webpack-Simple

Para este ejemplo usaremos el cliente de Vue

Usaremos la plantilla `webpack-simple` y se creara en la carpeta `mi-app-webpack-simple`
```sh
vue init webpack-simple mi-app-webpack-simple
```

Debemos instalar las dependencias que usaremos para construir nuestra app
```sh
cd mi-app-webpack-simple
npm install
```

Para comenzar a trabajar `npm run dev` de esta manera cada vez que realicemos un cambio se "compila" automáticamente y refresca el navegador.

Estructura de nuestra App

```text
▾ mi-app-webpack-simple/
  ▸ node_modules/
  ▾ src/
    ▸ assets/
      - App.vue
      - main.js
    - index.html
    - package-lock.json
    - package.json
    - README.md
    - webpack.config.js
```

El archivo `index.html` es la pagina principal de nuestra aplicación.

El archivo `webpack.config.js` contiene la configuración para [webpack](http://webpack.js.org/).

En la carpeta `src` (source) en donde están los archivos fuente de nuestra aplicación.

El archivo `main.js` es por donde inicia nuestra App, y donde podemos incluir plugin y configurar Vue.

Los archivos `.vue`  como `App.vue` con archivos especiales o creados por  el equipo de Vue, para poder visualizar correctamente el contenido podes usar estos [plugin para tu IDE](https://github.com/vuejs/awesome-vue#source-code-editing).

Estos archivos ([.vue](https://github.com/MaraniMatias/vuejs-talk-2017#componentes-de-un-solo-archivo-vue)) son archivos XML con tres bloques **Template**, **script** y **styles**, de esta manera un solo archivo por componente, (si quieres podes usar archivos individuales)

Otro detalle importante es que al usar webpack podemos usar [bable](https://babeljs.io/) de esta manera escribimos javascript en su version 6 o mas reciente y por medio de bable es interpretado para dar como resultado un javascript más estándar y que pueda ser usado en cualquier navegador actual.

### Crearemos un componente.

Por cuestiones de organizaciones crearemos un a carpeta `components` dentro de `scr`, y dentro un archivo `hello.vue`

```html
<template>
<div>
  <h1>{{ message }}</h1>
  <input v-model="message">
  <button v-on:click="change('message')">change</button>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      message: 'Welcome to your Vue.js app!'
    };
  },
  methods: {
    change: function (value) {
      this.message = "new " + value;
    }
  }
}
</script>

<style scoped>
h1 {
  font-style: italic;
  color: blue;
}
</style>
```

Para poder usar nuestro componente debemos registrarlo en el componente que lo vamos a usar en teste caso `App.vue`

```html
<script>
import Hello from './components/hello.vue';

export default {
  name: 'app',
  components: {
    'hello': Hello
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
```

> Aclaración `data()` es lo mismos `data: function(){}`


Ahora poder incorporar `<hello></hello>` dentro del div `#app`

### Agregamos un componente dentro de hello

Lo llamaremos `child.vue`

```html
<template>
<div>
  <h1>{{ reversedMessage }}</h1>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      message: 'Welcome to your Vue.js app!'
    };
  },
 computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
}
</script>

<style scoped>
h1 {
  font-style: italic;
  color: red;
}
</style>
```

Registramos el componente `child` dentro de `hello`

Agregamos `import Child from './child.vue';` dentro de la etiquete `script` y dentro del objeto a exportar la propiedad components

```html
<script>
import Child from './child.vue';

export default {
  components: {
    'Child': Child
  },
  //...
  }
</script>
```

Listo ahora podemos usar las etiquetas HTML `<child></child>`

## Devtool

Para ayudarnos a ver ver la estructura de nuestra Vue app podemos usar la [DevTool](https://github.com/vuejs/vue-devtools) es un plugin para nuestro navegador en donde vemos el árbol de elementos HTML, los componentes usados con sus propiedades, datos, métodos, etc.

Podes descargarlos desde este [link](https://github.com/vuejs/vue-devtools#installation)

## 3 - Ejemplo plantilla Webpack

Los ejemplos anteriores son útiles para aplicaciones pequeñas, pero en la vida real la mayoría de las aplicaciones necesitan una estructura más amplia por eso usaremos la plantilla `webpack`.

```sh
vue init webpack my-app-webpack
```

Por se nuestro primer proyecto lo configuraremos de la siguiente manera:

```sh
? Vue build
❯ Runtime + Compiler: recommended for most users
```

```sh
? Install vue-router? (Y/n) Y
```

Opcional, [ESlint](https://eslint.org/) sirbe para escribir javasctipt con buenas practicas.
```sh
? Use ESLint to lint your code? (Y/n) Y
❯ Airbnb (https://github.com/airbnb/javascript)
```
Elegimos No para la siguiente opciones, porque no la vamos a explicar en este artitulo.
```sh
? Setup unit tests No
? Setup e2e tests with Nightwatch? No
```

La estructura que nos interesa es la de la carpeta `src`

```text
▾ src/
  ▸ assets/
  ▾ components/
     - HelloWorld.vue
  ▾ router/
      - index.js
    - App.vue
    - main.js
```

Esta app consiste en usar [vue-router](https://router.vuejs.org/en/) nos permite cambiar entre componentes según la URL y usar esos componente como raíz de otros.

Vamos a ver el archivo `index.js` dentro de la carpeta `router`.

Estas lineas nos permite usar el plugin.
```javascript
import Router from 'vue-router';
Vue.use(Router);
```

Importamos los componentes que serán llamados al cambiar las URL
```javascript
import HelloWorld from '@/components/HelloWorld';
```

Para configurar el plugin
```javascript
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
});
```

En el archivo `main.js`, la linea `import router from './router';` solo importa el contenido del archivo anterior y en la instancia Vue para poder usar el plugin es agregado con `router`.

En el archivo `App.vue` entraremos un tag `<router-view/>` es el elemento donde se incorporan los componentes que dependen de la URL.

## Vuex

Para aplicaciones donde necesitemos compartir información entre varios componentes podemos usar un lugar común donde guardar y modificar esas información, para ello usamos el plugin [Vuex](https://vuex.vuejs.org/en/)

Esta imagen muestra el concepto de Vuex

![](https://raw.githubusercontent.com/MaraniMatias/vuejs-talk-2017/master/img/vuex.png)

* **State** Es el lugar donde esta la información a compartir con nuestro componente.
* **Actions** Cuando un componente decide obtener información de la API despacha (dispatch) una Acción y esta consulta al backend.
* **Mutations** Cuando la información que trae del backend o otra que deseamos percitir en el State confirmamos (commit) una mutación, la encargada de modificar el estado.
* **Getters** Para obtener información del State.

Es importante no saltear el flujo para cambiar el estado, si un componente desea cambiar la información sin consultar al backend debería pasar por actions y después por mutación.

Un ejemplo útil [vuejs-shopping-cart](https://github.com/vuejs/vuex/tree/master/examples/shopping-cart)

Dejo un ejemplo sencillo en `mi-app-vuex`

