import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

gallery.addEventListener("click", onImageClick);
createGalleryItems();

const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
});

function createGalleryItems() {
    const markup = galleryItems
        .map((image) => {
            return `
                <a class="gallery__item" href="${image.original}">
                    <img
                        class="gallery__image"
                        src="${image.preview}" 
                        alt="${image.description}"
                    />
                </a>
            `;
         })
        .join('');
    
    gallery.insertAdjacentHTML("beforeend", markup);
}

function onImageClick(event) {
    // prevent link from opening
    event.preventDefault();
}