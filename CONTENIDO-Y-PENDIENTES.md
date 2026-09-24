# Contenido de Sky Club

## Enlaces configurados

- Reservas: https://booksy.com/es-es/167828_sky-club_barberia_58087_valencia
- Instagram: https://www.instagram.com/skyclub_es/
- Tienda de hombre (Órbita): https://hormaycuero.lovable.app
- Compra Mary Kay, cuidado de la piel: https://www.marykay.es/skyskinclub/es/cuidado-de-la-piel?utm_source=shopmanager&utm_medium=QRCode&utm_campaign=sharemyshop
- WhatsApp para joyería, dieta y rutina: https://wa.me/34677263672

## Imágenes

- `public/fuxion-sky-club.png`: imagen FuXion facilitada por el usuario.
- `public/cuidado-facial-sky-club.png`: imagen de cuidado facial facilitada por el usuario.
- `public/orbita-horma-cuero.jpg`: fotografía de la portada de la tienda enlazada, procedente de https://hormaycuero.lovable.app/assets/hero-shoe-CBMCKCjj.jpg.
- `public/joyeria-inspiracion.jpg`: imagen ilustrativa, no un catálogo real; procedente de https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1000&q=85. La web la identifica como inspiración.

## Vídeos sugeridos

Metadatos comprobados con YouTube oEmbed. Las miniaturas cargan antes del reproductor; se puede cambiar de vídeo o abrirlo directamente en YouTube.

- Marian Rojas Estapé, Malasmadres: https://www.youtube.com/watch?v=RI_dIDTD06U
- Tim Ferriss, TED (en inglés): https://www.youtube.com/watch?v=5J6jAC6XxAI
- José Elías, Tengo un Plan: https://www.youtube.com/watch?v=5VUG2OPwbvs

## Pendiente de datos

- **Pagos de Órbita**: el repositorio actual contiene Sky Club, no la tienda externa. Su cesta no abrió un checkout durante la comprobación. Se necesita el repositorio de la tienda y su configuración de productos/precios/pagos, o enlaces de pago del comercio. Enlazar la tienda no activa sus pagos. No se ha creado ningún cobro ni se han reutilizado los precios de dieta/rutina para vender calzado.
- **FuXion**: falta el enlace del distribuidor de Sky Club. El botón solicita ese enlace por WhatsApp hasta recibirlo. Configuración en `src/lib/serviceLinks.ts`.
- **Vídeo propio**: el usuario indica que no dispone de él. Se conserva el audio existente. Cuando esté publicado en YouTube, establecer `VITE_SKY_CLUB_VIDEO_ID` con su ID de 11 caracteres y reconstruir la web. Aparecerá como vídeo destacado del club. Las sugerencias se identifican como contenido de sus respectivos autores.
- **Joyería**: faltan fotos y catálogo reales. La sección visual usa una imagen ilustrativa y consulta de modelos/precios por WhatsApp, sin carrito ni pagos.

Los cambios son locales; no se ha publicado la web ni modificado la tienda externa.
