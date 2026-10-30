# Propuesta Tecnológica Empresarial: Modernización Power Apps a Flutter Desktop
**Sistema de Control de Cambios FADM36-1 (v1.5) – Ajover Darnel S.A.S.**  
*Arquitectura Empresarial: Flutter Desktop + SharePoint Online + Power Automate + Spring Boot (Evaluación)*

---

## 🎯 Finalidad del Proyecto

Este directorio contiene la propuesta técnica, económica y de ciberseguridad para presentar ante la Dirección / Jefatura de Área y el Departamento de TI (Infraestructura, Redes, Seguridad Informática y Administradores de Microsoft 365).

La propuesta evalúa la modernización del sistema de Control de Cambios **FADM36-1**, migrando la interfaz de usuario desde la actual Power Apps en navegador hacia una aplicación nativa de escritorio para Windows desarrollada con **Flutter**, manteniendo el 100% de la gobernanza de datos en **SharePoint Online** y la reutilización de los flujos de correo en **Power Automate**.

---

## 📂 Estructura de Entregables

```
propuesta-flutter-empresarial/
├── index.html          # Documento interactivo web profesional (Dashboard Ejecutivo, Auditoría, Matriz y TCO)
├── css/
│   └── styles.css      # Sistema de diseño sobrio, empresarial, adaptable y optimizado para impresión (Ctrl + P)
├── js/
│   └── app.js          # Motor JavaScript: Calculadora interactiva de costos, tabs, acordeones, checklist y modo presentación
├── assets/             # Recursos visuales y diagramas
└── README.md           # Guía técnica de uso y despliegue del informe
```

---

## 🚀 Cómo Abrir y Utilizar el Informe Interactivo

1. **Apertura Directa:**
   - Haz doble clic en el archivo [`index.html`](file:///c:/Users/USUARIO/Music/CASA/2powerapp/propuesta-flutter-empresarial/index.html) desde el Explorador de Archivos de Windows.
   - Se abrirá en cualquier navegador moderno (Microsoft Edge, Google Chrome, etc.) sin necesidad de internet ni de servidores web locales.

2. **Modo Presentación para la Reunión:**
   - En la barra superior, haz clic en el botón **🖥️ Modo Presentación**.
   - Oculta los elementos de navegación y maximiza las tarjetas con tipografía ejecutiva para proyectar en salas de juntas o compartir pantalla por Microsoft Teams.
   - Presiona `Esc` o el botón flotante inferior para salir.

3. **Exportación a PDF / Impresión:**
   - Haz clic en **🖨️ Imprimir / Guardar PDF** o presiona `Ctrl + P`.
   - El sistema de diseño cuenta con una hoja de estilo `@media print` que elimina menús, botones interactivos y fondos de pantalla, generando un documento técnico limpio de auditoría listo para firma o radicación formal.

4. **Calculadora Interactiva de TCO:**
   - En la sección de Costos, puedes modificar en tiempo real el número de usuarios, horizonte de años y tasa de cambio USD/COP para simular los tres escenarios de inversión.

---

## 📊 Síntesis de las Alternativas Evaluadas

| Alternativa | Frontend | Almacenamiento | Automatización | Servidores Extras | Recomendación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Opción A: Continuar en Power Apps** | Power Apps Web | SharePoint Online | Power Automate | $0 USD/mes | Mantener temporalmente mientras se prepara el piloto. |
| **Opción B: Flutter + SharePoint (Directa)** | Flutter Windows | SharePoint Online (Graph API) | Power Automate (Eventos) | **$0 USD/mes** | ⭐ **RECOMENDADA (Fase 1):** Máximo rendimiento, cero sobrecosto de hosting y fácil aprobación TI. |
| **Opción C: Flutter + Spring Boot (Render)** | Flutter Windows | Backend en Render PaaS | Power Automate | ~$25 USD/mes | **Desaconsejada:** Riesgo de rechazo por TI al enviar datos corporativos a un PaaS externo. |
| **Opción D: Flutter + Spring Boot (Azure)** | Flutter Windows | Backend Azure Container Apps | Power Automate | ~$45 - $58 USD/mes | **Fase Futura (Escalabilidad):** Cuando se requiera lógica de negocio pesada o integración con ERP. |

---

## 🛡️ Aspectos Clave de Seguridad Informática

- **Autenticación:** Microsoft Entra ID mediante *OAuth 2.0 Authorization Code Flow con PKCE* en navegador del sistema (SSO + MFA empresarial).
- **Protección de Tokens:** Almacenamiento seguro en disco con *Windows Data Protection API (DPAPI)*. Cero contraseñas o secretos embebidos en el binario.
- **Permisos Acotados:** Solicitud exclusiva de `Sites.Selected` para restringir el acceso a la colección de sitios de Control de Cambios de Ajover Darnel.
- **Distribución:** Compilación de instalador firmado (MSI) desplegado vía Microsoft Intune o directivas de grupo GPO.

---
*Elaborado para la reunión técnica y ejecutiva de Ajover Darnel S.A.S. – Octubre de 2026*
