# Porfolio Integrador — Florencia Pérez Fernández

Sitio estático (HTML + CSS + JS, sin build) con el porfolio de residencia docente.

## Estructura

```
index.html      → página principal (textos: buscá los comentarios "EDITAR")
clase.html      → plantilla de cada clase de la trayectoria (clase.html?n=1 … n=8)
css/styles.css  → estilos (colores y fuentes arriba de todo, en :root)
js/datos.js     → planificación, trayectoria (clases) y mensajes del 1er ciclo
js/comun.js     → utilidades compartidas
js/main.js      → animaciones de la página principal
js/clase.js     → armado de la página de cada clase
img/            → fotos
```

Después de cambiar CSS o JS, subí el número `?v=` en los `<link>` y `<script>` de
`index.html` y `clase.html` para que los navegadores no usen la versión vieja.

## Ver en local

```
python -m http.server 5500
```

y abrí http://localhost:5500

## Publicar en Cloudflare Pages

Workers & Pages → Create → **Pages** → Connect to Git → elegí este repo.

- Framework preset: **None**
- Build command: *(vacío)* o `exit 0`
- Build output directory: `/`

Cada `git push` a `main` vuelve a publicar automáticamente.
