# Instalaciones
* Insatalar Yarn para manejo de dependecias

### Paquete para jecutar aplicación 
ejecutar aplicación sin necesidad de publicar en la playstore. 
Se instala de manera global `yarn global add expo-cli` 

## Para guardar las aplicaciones ir a [https://expo.io/] y registrarse
iniciar sesión con `expo lign` subir el proyecto con `expo publish`


# Backend-Server
usar strapi para facilitar el backend [https://strapi.io/]
* iniciar el proyecto `https://strapi.io/` con la suiguiente configuración:
    -custom manual settings
    -mongo
    -nome bd
    -host:cluster0.gz5c5.mongodb.net
    -true
    -port:27017
    -user usuario creado en mongo atlas
    -password usuario creado en mongo atlas
    -admin
    -yes
* ingresar a la carpeta del backend y ejecutar la app escribir el comando `yarn develop`