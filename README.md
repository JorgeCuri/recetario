# Sabores de Oriente y Occidente

Recetario familiar de Luz Mary Wabi Hauayek de Curi — *Memorias a la Mesa*.

Página para consultar las 487 recetas desde el celular: búsqueda por platillo, ingrediente o persona, la página real del libro y PDF de una receta o de una selección para compartir por WhatsApp. Se puede instalar como app con «Agregar a pantalla de inicio».

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página completa |
| `recetas.json` | Título, autora, categorías, páginas y texto de cada receta |
| `libro.pdf` | Interiores del libro (v8.1) |
| `portada.jpg`, `retrato.jpg`, `icon-*.png` | Imágenes de la portada |
| `sw.js`, `manifest.webmanifest` | Lo que permite instalarla y abrirla sin conexión |

## Para actualizar

Cuando cambie el libro, reemplazar `libro.pdf` y `recetas.json` y subir `VERSION` en `sw.js` (por ejemplo `sabores-v2`), para que los teléfonos que ya la instalaron reciban la nueva versión.

La página no aparece en buscadores (`robots.txt` y `noindex`), pero cualquiera con la liga puede abrirla.
