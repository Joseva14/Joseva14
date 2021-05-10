# Inicio del proyecto
* iniciar le proyect `expo init`
    -name app
    -template blank
    
* ingresar a la carpeta y para ejecutar `yarn android`

## Diseño de la app
material design con  react-native-paper [https://callstack.github.io/react-native-paper/], 
    -para instalar la libreria usar: `yarn add react-native-paper`
    -para instalar los iconos usar: `yarn add react-native-vector-icons`

## Formularios
validaciones estructura de objetos `yarn add yup`  para manejar el formulario `yarn add formik`

## Variables de entorno 
para llamar variables de entorno en .env `yarn add react-native-config`

-configurar la ip del backend instalamos `yarn add axios` para hacer peticiones al servidor

## Mensajes por pantalla
libreia para mensajes en pantalla `yarn add react-native-root-toast`

### Guardar en el storage y recuperar
*Para guardar y recuperar información en el Storage usar la siguiente libreria `yarn add @react-native-async-storage/async-storage`

*Decodificar el token con la siguiente libreria `yarn add jwt-decode`

## Sistema de navegación
paquete para necesario`yarn add @react-navigation/native`, para expo se necesita la siguientes librerias `yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view` [https://reactnavigation.org/docs/getting-started]
    -boton de navegación en la parte de abajo `yarn add @react-navigation/material-bottom-tabs`(necesita react-native-paper)
    -iconos en los botones `yarn add react-native-vector-icons`
    -Proporciona una manera para transición entre pantallas donde cada nueva pantalla se coloca encima de una pila `yarn add @react-navigation/stack`

## Funcionalidades adicionales de con javascript
paquete para agregar funciones adicionales en javascript usando lodash `yarn add lodash` [https://lodash.com/]

## Formulario largos con Scroll
paquete para hacer scroll en formularios grandes de react native `yarn add react-native-keyboard-aware-scroll-view`

## Mostrar todas las imagenes en Slider
Para deslizar las imagenes es necearia la dependencia `yarn add react-native-snap-carousel` [https://github.com/meliorence/react-native-snap-carousel]

## Menu dezplegable
Para crear un menu dezplegable para seleccionar la cantidad de producto `yarn add react-native-dropdown-picker` [https://www.npmjs.com/package/react-native-dropdown-picker]