import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('ul.gallery')

const toMarkup = galleryItems.map(({ preview, original, description }) => `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`).join("");
gallery.insertAdjacentHTML('beforeend', toMarkup);

gallery.addEventListener("click", onClick);

function onClick(evt) {
    evt.preventDefault();
    const { target } = evt;
    if (!target.classList.contains('gallery__image')){
        return;
    }
    const correctImage = target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${correctImage}" width="800" height="600">
`,
    {
      onShow: (instance) => {
        window.addEventListener('keydown', closeEsc);
      },
      onClose: (instance) => {
        window.removeEventListener('keydown', closeEsc);
      },
    }
  );
    instance.show()

    function closeEsc(evt) {
        if (evt.key === 'Escape') {
            instance.close();
        }
    }
}