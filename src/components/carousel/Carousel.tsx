import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useNavigate } from "react-router-dom"

interface Slide {
  image: string;
  slug: string;
}

interface CarouselProps {
  slides: Slide[];
}

function Carousel({ slides }: CarouselProps) {

  const navigate = useNavigate()

  if (!slides || slides.length === 0) return null;

  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow, Pagination]}
      effect="coverflow"
      centeredSlides={true}  
      slidesPerView={3}     
      loop={true}
      autoplay={{ delay: 1000, disableOnInteraction: false }}
      allowTouchMove={false}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 2,
        slideShadows: false,
      }}
      className=" w-full h-60 py-10 z-0 mx-auto fixed"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx} className="flex justify-center items-center ">
            <div className="flex justify-center items-center w-full h-full "> 
            <img
              onClick={() => navigate(`/programmer/${slide.slug}`)}
              src={slide.image}
              className="max-w-4/5 h-full object-contain cursor-pointer overflow-top fixed"
            />
            </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel