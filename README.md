# __Proyecto de migración__

En el presente ejercicio me propongo migrar mi antiguo proyecto formativo, un proyecto que realicé durante mi tiempo cursando la carrera de __Tecnólog en análisis y desarrollo de sistemas de información__, este es un proyecto bastante complejo y relativamente grande, puedo decir que es un sistema __full-stack__, cuenta con su apartado ``cliente`` y su apartado ``servidor``, el primero constó de una app _SPA_ con _react.js_ y el segundo es un servicio _REST FUL_ con _PHP_, además de una Base de datos _MySQL_.

| Cliente (front-end) | Servidor (back-end)| Base de datos|
|---|---|---|
|el cliente está desarrollado con __React.js__ utilizando la herramienta ``create-react-app``, los recientes acontecimientos con esta herramienta es un motivante más para realizar esta migración| el servidor está desarrollado con vanilla __PHP__ con una biblioteca de manejo de jsonqwebtoken para autenticación y autorización, se implementó un servicio Rest Ful con endpoints para diversas operaciones en la base de datos| La base de datos es una implementación de modelo relacional __MySQL__ con tablas normalizadas y esquema dedicado a los requerimientos funcionales del cliente que provee datos al __back-end__ del proyecto|

<hr />

## __¿De qué va el proyecto?__
El proyecto nació como una solución informática hacia un problema logístico identificado en una empresa ficticia proveedora de bestimenta para niños, al parecer la mercancía almcenada en bodega se gestionaba a por medios __físicos__, formátos impresos principalmente, los registros históricos del movimiento de la bodega podían perecer al no tener otro medio para su conservación, además que el constante ajetreo podría permitir el __error humano__ en el registro y gestión de los datos de la mercancía. Por ello, un sistema de información surgió como una solución a tales imconvenientes.

## __Objetivo general__
Crear un producto SOFTWARE que sirva de soporte al registro, seguimiento y selección de la mercancía con la naturaleza logística de un inventario. Ordenando cada producto almacenado en bodega en función de la distribución física de la misma, de igual forma guardará registro del movimiento de cada unidad en categoría de ingreso o egreso de la bodega, responsabilizando a los actores (operadores) de cada uno de estos eventos al adjuntar su información en la referencia de cada registro.

## __Objetivos específicos__
Entre los procesos que el software deberá realizar están:
- __Registrar operador:__
  Registro de operadores del sistema de información para acceder a los procesos de operatividad.
- __Ingreso de Operador:__
Ingreso de operador registrado previamente para dar uso de los beneficios potenciales del sistema.
- __Registrar producto:__
Se registra información referente a producto: 
  - Código
  - Talla
  - Tipo de prenda
  - Color 
  - Ubicación en bodega
  - Cantidad
  - Valor Unitario

- __Modificar información de producto:__
Modificar información referente a un producto en caso de una actualización de los estados del mismo, los cuales pueden ser su estado o sus datos registrados.
- __Consultar información de producto:__
Consulta información por un campo de texto de búsqueda.
- __Filtrar datos de búsqueda:__
Filtra por cada una de las categorías establecidas en la base de datos para cada producto.
- __Mostrar información de producto:__
Mostrar información de producto tras una consulta mediante previo filtrado.
- __Acción de administrador__
Acciones variadas posibles para el administrador, entre las cuales tenemos:
  - __Modificar operador:__
	Esto en caso de una actualización en los datos de operador.
  - __Eliminar operador:__
	Si un operador es retirado de sus funciones.
  - Consultar registro de actividad

- __Mostrar información de registro:__
Mostrar información de registro tras una respectiva consulta por parte del administrador.

## __Perspectiva del producto__
El sistema a desarrollar es autónomo y no requiere de un programa paralelo para la obtención de sus beneficios potenciales. Su uso se limita al área de bodega en la entidad empresarial EPK, estará operando como apoyo o soporte a los procesos con la intención de aumentar la productividad. Como herramienta informática pretende ser de fácil uso y aprendizaje general, acomodando su diseño a los requerimientos de los stakeholders.

## __Funciones del producto__
Dentro de sus principales funciones están:
1.	Categorizar la información: 
    - Código 
    - Talla
    - Tipo de prenda, color
    - Estado del producto (disponible/no disponible/agotado)
    - Ubicación en bodega 
    - Precio de venta.
2.	Sistema de búsqueda y consulta sobre el estado actual de la mercancía con sus respectivos filtros.
3.	Registrar y/o modificar información referente a productos almacenados en bodega.
4.	Registrar la actividad de cada acción realizada con la mercancía, esto incluye: 
    - Fecha de modificación, actualización o remoción
    - Información de credenciales del trabajador responsable de la acción.
5.	Controlar de acceso limitado en distintos niveles jerárquicamente definidos:
    - __Operador__: es aquel usuario registrado en el sistema ccapaz de realizar consultas dando uso de los filtros disponibles, además podrá realizar acciones para con la mercancía responsabilizándose de las mismas, entre estas está: 
      - registro de mercancía
      - modificación en la información de mercancía
      - remoción de mercancía.
    - __Administrador__: es aquel con la capacidad de modificación de información sensible en la base de datos, pudiendo editar la información de los operadores en vigor y el resto de operaciones de un operador.
6.	Mostrar la información en un apartado de visualización, y podrá enviar a impresora la información allí expuesta.

## __Diagramsa UML__
en proceso...