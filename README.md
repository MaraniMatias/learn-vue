# learn-vue
Aprender vuejs 2.5 material para la cátedra de TTADS, UTN-frro

## Requisitos previos

Instalar [nodeJS](https://nodejs.org/es/)

Instalar el cliente de Vue, [vue-cli](https://github.com/vuejs/vue-cli), con el tenemos diferentes plantillas para nuestros proyectos.

```sh
npm install -g vue-cli
```

## 1 - Ejemplo Simple

### Primer componente

El Vue más simple posible configurado en un solo archivo HTML.

```sh
# Crear un directorio donde vamos a trabajar
mkdir vue-simple
cd vue-simple

# En el directorio, creamos un archivo html
touch index.html
```

Incluimos el core de Vue `<script src="https://unpkg.com/vue"></script>`.

Crearemos un componente básico

En nuestro HTML incluimos las siguientes lines que pertenece ala estructura de nuestro componente

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
