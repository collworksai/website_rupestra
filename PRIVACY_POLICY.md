# Politica de Privacidad de Rupestra

**Ultima actualizacion:** 17 de mayo de 2026

---

## Introduccion

Rupestra es una aplicacion de analisis de arte rupestre desarrollada por Collworks. Esta politica explica que datos recopila la aplicacion, como los utiliza y los derechos que tienes como usuario.

**Principio fundamental:** Rupestra funciona completamente en tu dispositivo. No enviamos, almacenamos ni procesamos tus datos en ningun servidor externo. No existe registro de cuenta ni inicio de sesion.

---

## Datos que recopila la aplicacion

Rupestra accede a los siguientes datos exclusivamente para su funcionamiento local:

### 1. Camara

- Para fotografiar arte rupestre y realizar analisis en tiempo real (Live Scan).
- Las imagenes capturadas se almacenan unicamente en tu dispositivo, en el almacenamiento local de la app.

### 2. Galeria de fotos

- Para seleccionar imagenes existentes y analizarlas.
- Al cargar una foto, la app extrae los **metadatos EXIF** (apertura, ISO, longitud focal, modelo de camara y lente). Si la foto contiene **coordenadas GPS** embebidas, estas tambien se extraen y almacenan en el registro de analisis.
- Los resultados del analisis pueden guardarse en tu galeria de fotos si lo solicitas explicitamente.

### 3. Microfono

- Para grabar notas de voz sobre el yacimiento.
- Las grabaciones se almacenan localmente como archivos de audio (M4A).

### 4. Reconocimiento de voz

- Para transcribir las notas de voz a texto.
- La transcripcion se realiza **en el dispositivo** mediante el motor de reconocimiento de voz de Apple (SFSpeechRecognizer, idioma espanol). El audio no se envia a ningun servidor.

### 5. Ubicacion (GPS)

- Para registrar las coordenadas geograficas del yacimiento en el informe.
- Se captura latitud, longitud, altitud y orientacion (norte verdadero).
- Se utiliza la geocodificacion inversa de Apple para obtener la localidad y region del yacimiento.
- La ubicacion solo se solicita cuando el usuario lo autoriza explicitamente.

### 6. Brujula

- Para capturar la orientacion (norte verdadero) del yacimiento.

---

## Almacenamiento de datos

Todos los datos se almacenan **exclusivamente en tu dispositivo**:

- **Base de datos local**: metadatos de sesiones (nombre del sitio, coordenadas, notas, datos EXIF, tipo de pigmento, resultados del analisis).
- **Archivos en el dispositivo**: imagenes de analisis (JPEG), notas de voz (M4A), miniaturas.
- **Preferencias locales**: parametros de calibracion de deteccion de pigmentos.

Ningun dato se sube a la nube, se sincroniza con servidores externos ni se comparte con terceros de forma automatica.

---

## Informes PDF

Rupestra genera informes en formato PDF que incluyen:

- Nombre y ubicacion del yacimiento (coordenadas, altitud, localidad)
- Imagenes del analisis (original, resaltado, calco, decorrelacion PCA)
- Metadatos de la fotografia (apertura, ISO, focal, dispositivo)
- Notas del usuario

**Importante:** Si compartes un PDF exportado, el destinatario podra ver toda la informacion contenida en el informe, incluyendo las coordenadas GPS del yacimiento. Comparte estos informes solo con personas de tu confianza.

---

## Datos que NO recopilamos

- No recopilamos datos de uso ni analiticas.
- No utilizamos identificadores publicitarios (IDFA).
- No registramos direcciones IP.
- No utilizamos cookies ni tecnologias de seguimiento.
- No compartimos datos con terceros.
- No almacenamos datos en servidores propios ni de terceros.
- No requerimos registro de cuenta ni inicio de sesion.

---

## Servicios de terceros

Rupestra no integra ningun SDK, libreria ni servicio de terceros. Utiliza exclusivamente frameworks nativos de Apple (SwiftUI, AVFoundation, CoreImage, CoreLocation, Speech, Photos, SwiftData).

Los unicos servicios externos invocados son APIs del sistema operativo iOS:

- **Geocodificacion inversa** (CLGeocoder de Apple): convierte coordenadas GPS en nombres de localidad. Sujeta a la [Politica de Privacidad de Apple](https://www.apple.com/legal/privacy/).
- **Reconocimiento de voz** (SFSpeechRecognizer de Apple): transcribe audio a texto en el dispositivo.

---

## Eliminacion de datos

Puedes eliminar tus datos en cualquier momento:

- **Sesiones individuales**: desliza para eliminar en la Biblioteca. Se borran la sesion, todas sus imagenes, miniaturas y notas de voz asociadas.
- **Proyectos**: eliminar un proyecto no elimina sus sesiones (quedan como sesiones sin proyecto asignado).
- **Calibracion**: restablece los parametros de deteccion desde la pantalla de calibracion de cada pigmento.
- **Eliminacion completa**: desinstalar la aplicacion elimina todos los datos almacenados localmente.

---

## Seguridad

Los datos almacenados en Rupestra estan protegidos por los mecanismos de seguridad de iOS:

- Cifrado a nivel de sistema de archivos (iOS Data Protection)
- Sandboxing de aplicaciones (los datos no son accesibles por otras apps)
- La base de datos esta cifrada por defecto en iOS

---

## Menores

Rupestra no esta dirigida a menores de 13 anos. No recopilamos intencionalmente informacion de menores. Si descubres que un menor ha proporcionado datos personales a traves de la aplicacion, contacta con nosotros para proceder a su eliminacion.

---

## Cambios en esta politica

Nos reservamos el derecho de actualizar esta politica de privacidad. Cualquier cambio sera publicado en esta misma pagina con la fecha de ultima actualizacion. Te recomendamos revisar esta politica periodicamente.

---

## Contacto

Si tienes preguntas sobre esta politica de privacidad o sobre el tratamiento de tus datos, puedes contactarnos en:

**Correo electronico:** collworks.ai@gmail.com
**Desarrollador:** Collworks
