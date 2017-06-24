# Proyecto MEAN

## Instrucciones para levantar el proyecto

### Requisitos

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Levantarlo con `mongod`

### Desarrollo

1. Ejecutar `npm install` para instalar las dependencias del servidor.
2. Ejecutar `mongod` en otra consola para tener corriendo una instancia de MongoDB.
3. Ejecutar `gulp serve` para levantar el servidor en modo desarrollo. Esto automaticamente abrira una pestaña nueva en su navegador cuando este listo.
4. Abrir en el navegador http://localhost:3000/

* Swagger: En la ruta http://localhost:3000/api tiene toda la documentacion de las apis gracias a Swagger

## Deploy o visualizacion del proyecto

- Gulp: Teniendo instalado todo lo que se requiere

1. Ejecutar `gulp build` para compilar el proyecto y `gulp serve:dist` para levantarlo en modo produccion.
2. abrir en el navegador http://localhost:8080/

- Docker: Teniendo docker y docker-compose instalado debe correr los comandos 

1. docker-compose build (esto realiza el build del proyecto)
2. docker-compose up -d (levantara los contenedores como demonios)
3. docker logs -f 'nombre del contenedor' (aqui podra ver el log del proyecto para saber cuando estara listo, esto puede tomar unos segundos y asi podra ver que sucede realmente)
4. abrir en el navegador http://localhost:8080/

## Testing

Ejecutar `npm test` esto ejecutara los test con Karma.

## Yeoman

Generadores disponibles:

* Server side
    - angular-fullstack:endpoint

* Client Side
    - angular-fullstack:route
    - angular-fullstack:component
    - angular-fullstack:controller
    - angular-fullstack:filter
    - angular-fullstack:directive
    - angular-fullstack:service
    - angular-fullstack:provider
    - angular-fullstack:factory
    - angular-fullstack:decorator

Para utilizar Yeoman es necesario instalar estos modulos con el siguiente comando:

npm install -g yo gulp-cli generator-angular-fullstack
```

