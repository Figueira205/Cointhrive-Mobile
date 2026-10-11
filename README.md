# Cointhrive: web de presentación

Landing page de **Cointhrive**, una plataforma de finanzas personales que muestra en tiempo real los movimientos de tus cuentas bancarias y compara ingresos y gastos mes a mes. Presenta el producto, sus ventajas y tres planes de suscripción.

El panel de la aplicación está en [Cointhrive](https://github.com/Figueira205/Cointhrive).

**Demo:** https://figueira205.github.io/Cointhrive-Mobile/

![Vista previa de la web de Cointhrive](docs/preview.png)

## Secciones

| Sección | Contenido |
|---|---|
| **Inicio** | Propuesta de valor, botón de suscripción y foto principal con tarjetas flotantes de movimientos |
| **Visualiza todos tus movimientos** | Ejemplo de gastos e ingresos recientes con su fecha de actualización |
| **Creamos un producto sin comparación** | Cuadrícula con las cuatro ventajas: tiempo real, monitores las 24 horas, comparativa mensual e información confiable |
| **Conócelo hoy** | Banda de llamada a la acción con enlace al panel de demostración |
| **Planes** | Pago anual (recomendado), pago mensual y pago único, con cifras animadas |

## Los planes

| Plan | Precio | Detalle |
|---|---|---|
| Pago Anual (recomendado) | 99 $ | Ahorras 129 $ frente a pagar cada mes |
| Pago Mensual (básico) | 19 $ | Todas las ventajas, pagando mes a mes |
| Pago Único (permanente) | 299 $ | Un solo pago, de por vida |

El ahorro sale de 19 $ x 12 meses = 228 $, menos los 99 $ del plan anual.

## Detalles de la interfaz

- **Animación de entrada** del titular palabra por palabra y de la foto en forma de arco, con inclinación 3D suave al mover el cursor.
- **Botones magnéticos** que se acercan al cursor.
- **Revelado progresivo** de cada bloque al hacer scroll y **contador animado** en los precios.
- **Barra de progreso** de lectura y barra de navegación que se vuelve de cristal al bajar.
- **Movimiento reducido.** Si el sistema lo pide, se desactivan las animaciones y todo el contenido queda visible.
- **Adaptable.** Se adapta a móvil, con la cuadrícula en una columna en pantallas pequeñas.

## Estructura del proyecto

| Archivo | Función |
|---|---|
| `index.html` | Contenido de la landing y metadatos para buscadores y redes sociales |
| `styles.css` | Sistema de diseño: variables, secciones, cuadrícula, planes y adaptación |
| `main.js` | Animaciones de entrada, observadores de scroll, contadores y efectos del cursor |
| `ac/` | Imágenes: foto principal (`hero.webp`), moneda, logotipo e icono |
| `docs/` | Capturas para este README |

## Tecnología

- HTML, CSS y JavaScript sin framework ni compilación.
- Tipografía DM Sans (Google Fonts) e iconos [Phosphor](https://phosphoricons.com/).
- Imágenes en WebP y animaciones basadas solo en `transform` y `opacity`.

## Ejecutar en local

```bash
git clone https://github.com/Figueira205/Cointhrive-Mobile.git
cd Cointhrive-Mobile
python -m http.server 8000
```

Abre http://localhost:8000.

## Notas

- Los datos de movimientos son de ejemplo y los botones de plan no procesan pagos: es un proyecto de demostración.
