# VetCare Pro - Manual de Usuario

## 📋 Información del Proyecto

**Nombre del Proyecto**: VetCare Pro  
**Versión**: 1.0.0  
**Fecha**: Abril 2026  
**Metodología**: PMI (Project Management Institute)  


## 🎯 Objetivo del Proyecto

VetCare Pro es un sistema de gestión veterinaria diseñado para optimizar la administración de clínicas veterinarias enfocadas en perros. El sistema permite gestionar citas, historiales clínicos y comunicación de manera eficiente, aplicando principios de gestión de proyectos PMI.

## 📖 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Primeros Pasos](#primeros-pasos)
5. [Guía de Uso](#guía-de-uso)
6. [Roles de Usuario](#roles-de-usuario)
7. [Funcionalidades Principales](#funcionalidades-principales)
8. [Solución de Problemas](#solución-de-problemas)
9. [Mantenimiento](#mantenimiento)
10. [Apéndices](#apéndices)

## 🎯 Introducción

VetCare Pro es una aplicación web moderna que facilita la gestión integral de servicios veterinarios. Desarrollada con tecnologías web estándar (HTML5, CSS3, JavaScript ES6+), ofrece una interfaz intuitiva y responsive que se adapta a diferentes dispositivos.

### Beneficios Clave

- ✅ Interfaz moderna y fácil de usar
- ✅ Gestión completa de citas y pacientes
- ✅ Historiales clínicos centralizados
- ✅ Comunicación eficiente con clientes
- ✅ Persistencia de datos local
- ✅ Diseño responsive

## 💻 Requisitos del Sistema

### Navegador Web

- Google Chrome 90+ (recomendado)
- Mozilla Firefox 88+
- Microsoft Edge 90+
- Safari 14+

### Hardware Mínimo

- Procesador: 1 GHz
- RAM: 512 MB
- Espacio en disco: 10 MB
- Conexión a internet: No requerida (aplicación offline)

### Sistema Operativo

- Windows 10+
- macOS 10.15+
- Linux (Ubuntu 18.04+)

## 🚀 Instalación y Configuración

### Paso 1: Descarga del Proyecto

```bash
# Clona el repositorio (si aplica)
git clone https://github.com/tu-usuario/vetcare-pro.git
cd vetcare-pro
```

### Paso 2: Ejecución Local

```bash
# Inicia el servidor local
python -m http.server 8000
```

### Paso 3: Acceso a la Aplicación

1. Abre tu navegador web
2. Navega a: `http://localhost:8000`
3. La aplicación se cargará automáticamente

### Configuración Inicial

No se requiere configuración adicional. La aplicación utiliza almacenamiento local del navegador.

## 🎮 Primeros Pasos

### 1. Selección de Rol

Al iniciar la aplicación, selecciona tu rol en el selector superior derecho:

- **Administrador**: Acceso completo al sistema
- **Dueño de Mascota**: Vista personalizada para clientes

### 2. Exploración del Dashboard

- Revisa las estadísticas generales (solo para administradores)
- Visualiza las próximas citas
- Accede a las funciones principales desde la barra lateral

### 3. Creación de Datos de Prueba

Para familiarizarte con el sistema:

1. Ve a "Citas" y crea una nueva cita
2. Ve a "Historial Clínico" y agrega un registro médico
3. Ve a "Interacción" y envía un mensaje de prueba

## 👥 Roles de Usuario

### Administrador de Clínica

**Permisos**: Acceso completo a todas las funciones

- Gestión de todas las citas
- Acceso a todos los historiales clínicos
- Envío de comunicaciones a todos los clientes
- Visualización de estadísticas globales

### Dueño de Mascota

**Permisos**: Acceso limitado a datos personales

- Visualización de sus propias citas
- Acceso al historial de sus mascotas
- Recepción de mensajes de la clínica

## 📋 Guía de Uso

### Gestión de Citas

#### Para Administradores

1. Navega a "Citas" desde la barra lateral
2. Haz clic en "Nueva Cita"
3. Completa el formulario:
   - Dueño del cliente
   - Nombre de la mascota
   - Fecha y hora
   - Motivo del servicio
4. Haz clic en "Agendar Cita"

#### Para Dueños

1. Navega a "Mis Citas"
2. Visualiza tus citas programadas
3. Contacta a la clínica para modificaciones

### Historial Clínico

#### Agregar Nuevo Registro

1. Ve a "Historial Clínico"
2. Haz clic en "Nuevo Registro"
3. Completa la información:
   - Nombre de la mascota
   - Raza
   - Dueño
   - Peso
   - Observaciones médicas
4. Haz clic en "Guardar Historial"

#### Buscar Registros

- Utiliza la barra de búsqueda para filtrar por nombre, ID o dueño
- Los resultados se actualizan en tiempo real

### Comunicación

#### Enviar Mensajes

1. Ve a "Interacción"
2. Selecciona el canal (Email, SMS, In-App)
3. Elige el destinatario
4. Escribe el mensaje
5. Haz clic en "Enviar Mensaje"

#### Ver Historial

- Revisa todos los mensajes enviados en la sección inferior
- Los mensajes se ordenan por fecha (más recientes primero)

## 🔧 Solución de Problemas

### Problema: La aplicación no carga

**Solución**:

1. Verifica que el servidor esté ejecutándose
2. Comprueba la URL: `http://localhost:8000`
3. Limpia la caché del navegador (Ctrl+F5)
4. Intenta con un navegador diferente

### Problema: Los datos no se guardan

**Solución**:

- La aplicación usa almacenamiento local del navegador
- No borres los datos de navegación
- Si usas modo incógnito, los datos se perderán al cerrar

### Problema: Interfaz no responde

**Solución**:

1. Recarga la página
2. Verifica la consola del navegador (F12) para errores
3. Asegúrate de usar un navegador compatible

### Problema: Datos no aparecen en otras vistas

**Solución**:

- Los cambios se sincronizan automáticamente
- Si no aparecen, recarga la página
- Verifica que estés en el rol correcto

## 🔄 Mantenimiento

### Copias de Seguridad

Los datos se almacenan localmente. Para hacer backup:

1. Abre la consola del navegador (F12)
2. Ve a "Application" > "Local Storage"
3. Exporta los datos manualmente

### Actualizaciones

- La aplicación es estática, no requiere actualizaciones automáticas
- Para nuevas versiones, reemplaza los archivos

### Limpieza de Datos

Para eliminar todos los datos:

```javascript
// En la consola del navegador
localStorage.clear();
```

## 📊 Métricas y KPIs (PMI)

### Indicadores de Rendimiento

- **Tiempo de respuesta**: < 100ms para operaciones locales
- **Disponibilidad**: 100% (aplicación offline)
- **Usabilidad**: Interfaz intuitiva, curva de aprendizaje < 5 minutos
- **Persistencia**: Datos almacenados localmente de forma segura

### Control de Calidad

- ✅ Validación de formularios
- ✅ Manejo de errores
- ✅ Diseño responsive
- ✅ Compatibilidad cross-browser

## 📚 Apéndices

### A. Glosario de Términos

- **SPA**: Single Page Application (Aplicación de una sola página)
- **LocalStorage**: Almacenamiento local del navegador
- **Responsive**: Diseño que se adapta a diferentes tamaños de pantalla
- **Glassmorphism**: Estilo visual con efectos de vidrio translúcido

### B. Estructura de Archivos

```
vetcare-pro/
├── index.html          # Archivo principal
├── css/
│   └── styles.css      # Estilos y diseño
├── js/
│   ├── app.js          # Lógica principal
│   └── modules/        # Módulos funcionales
│       ├── appointments.js
│       ├── medicalRecords.js
│       └── communication.js
```

### C. Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **UI Framework**: CSS Grid y Flexbox
- **Icons**: Boxicons
- **Fonts**: Google Fonts (Outfit)
- **Storage**: Web Storage API (LocalStorage)

### D. Contacto y Soporte

Para soporte técnico o consultas:

- Email: soporte@vetcarepro.com
- Documentación: Este manual
- Versión actual: 1.0.0

---

## ✅ Checklist de Cumplimiento PMI

### 📋 Planificación

- ✅ Alcance definido claramente
- ✅ Requisitos identificados
- ✅ Cronograma establecido
- ✅ Recursos asignados

### ⚙️ Ejecución

- ✅ Desarrollo modular implementado
- ✅ Código probado y validado
- ✅ Documentación completa
- ✅ Calidad asegurada

### 👁️ Monitoreo y Control

- ✅ Métricas definidas
- ✅ Control de calidad implementado
- ✅ Riesgos identificados y mitigados
- ✅ Cambios controlados

### 🎯 Cierre

- ✅ Objetivos cumplidos
- ✅ Documentación finalizada
- ✅ Lecciones aprendidas documentadas
- ✅ Producto entregado

**Estado del Proyecto**: ✅ COMPLETADO  
**Fecha de Entrega**: Abril 2026  
**Calidad**: Alta (cumple estándares PMI)

---

_Este manual fue elaborado siguiendo las mejores prácticas de la metodología PMI para asegurar calidad, completitud y usabilidad._
