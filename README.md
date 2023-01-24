# :camera: Relevamiento visual

Aplicación móvil de fotos para edificios.

Incluye **2 secciones: cosas _Lindas_ y cosas _Feas_** del edificio. (Puede ser una mancha de humedad, un adorno de Navidad, una ventana y su paisaje, una telaraña, etcétera)

Los usuarios pueden navegar cualquier sección, subir fotos y votar a las que consideren más _lindas_ o más _feas_, respectivamente.

Los resultados se muestran en gráficos de torta (para las _lindas_) y de barra (para las _feas_).
<br>
<br>

## :arrow_forward: Demo

### Login y subir una foto:

<p align="center">
  <img alt='GIF: upload de foto "linda"' src="./gifs/upload-image.gif"/>
</p>

### "Likear" fotos:

<p align="center">
  <img alt='GIF: votación y gráficos' src="./gifs/voting.gif"/>
</p>
<br/>

## ¿Cómo funciona?

Con [React Native](https://reactnative.dev/); usando [Firebase](https://firebase.google.com) para la administración de usuarios, fotos y votos.

Cuando hablamos de "votos", entiéndanse por algo así como los "likes" en las típicas redes sociales. Aquí son votos porque influyen en una **votación** común a cada sección.

Los gráficos se actualizan instantáneamente cuando cualquier usuario vota (o "desvota") una imagen. Para hacerlo, el gráfico de tortas genera nuevos colores aleatorios ante la imposibilidad de predefinirlos (porque pueden haber infinitas nuevas fotos subidas y votadas).

Las fotos se guardan en el Storage de Firebase, y sus metadatos en Firestore, junto con la información de todos los usuarios y sus respectivos votos.

Por lo demás, el usuario no tiene mucho control sobre sus imágenes. Éstas generan automáticamente la fecha, hora y usuario asociado al subirlas, y no permiten ser eliminadas ni modificadas sin intervención de un administrador.

Tampoco hay comentarios, solamente votos.
<br/>
<br/>

## :arrow_down: Descargar

[Conseguila para Android](https://expo.dev/accounts/cfrancodev/projects/relevamiento-visual/builds/3c51a87a-c70c-4b9e-98b0-1f1210750054) y comenzá a visibilizar el arte (y los desmanes) de tus vecinos de edificio.
