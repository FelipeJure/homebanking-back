# Prueba Backend

Esta es una API donde puedes ingresar a la informacion, solamente luego de loguearte.
Esta API contiene informacion y la estructura de un sistema bancario.

## Estructura de base de datos

La base de datos cuenta con tablas de usuarios, cuentas bancarias, prestamos e historial de pago.

### Usuario

Esta tabla cuenta con datos personales como nombre, apellido, DNI, domicilio, fecha de nacimiento, email y telefono.
Tanto el DNI como el email deben ser datos unicos, es decir que no van a existir dos usuarios con el mismo DNI o email.
Ademas cuenta con una fecha de creado del usuario y fecha de actualizado.
En cuanto a las relaciones, el usuario va a presentar una relacion de uno a muchos con las siguientes tablas:

    * Cuentas bancarias: ya que un usuario puede tener muchas cuentas bancarias pero una cuenta bancaria va a pertenecer a un usuario.
    * Prestamos