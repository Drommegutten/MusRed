export interface Carousel {
    slides: Slide[];
}

interface Slide {
    image: string;
    title: string;
    slug: string;
}