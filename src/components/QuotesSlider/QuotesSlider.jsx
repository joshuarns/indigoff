import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { quotes as defaultQuotes } from '../../data/quotes';
import logoWhite from '../../assets/img/logo-indigoff-white.svg';
import './QuotesSlider.css';

function QuoteCard({ quote }) {
  return (
    <article
      className={`quote-card ${quote.image ? 'quote-card--image' : ''}`}
      style={
        quote.image
          ? { backgroundImage: `url(${quote.image})`, color: quote.color }
          : { backgroundColor: quote.bg, color: quote.color }
      }
    >
      <div className="quote-card__author">
        {quote.brandLabel ? (
          <span className="quote-card__brand">
            <img src={logoWhite} alt="Indigoff" className="quote-card__logo" />
            <span className="quote-card__brand-word">{quote.brandLabel}</span>
          </span>
        ) : (
          <>
            <span className="quote-card__name">{quote.name}</span>
            <span className="quote-card__company">{quote.company}</span>
          </>
        )}
      </div>
    </article>
  );
}

function QuotesSlider({
  title = 'Customize the applications that best suit your style and your spaces.',
  description = 'Each Indigoff creation blends modern function with a refined spirit made to live with you, shape to you, and reflect your unique sense of harmony.',
  quotes = defaultQuotes,
}) {
  const swiperRef = useRef(null);

  // Las zonas de navegación con cursor personalizado solo en puntero fino.
  const canHover =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  return (
    <section className="quotes">
      <div className="quotes__stage">
        <Swiper
          className="quotes__swiper"
          onSwiper={(s) => (swiperRef.current = s)}
          loop
          speed={450}
          grabCursor={false}
          slidesPerView={1.15}
          spaceBetween={16}
          breakpoints={{ 1024: { slidesPerView: 2.15, spaceBetween: 20 } }}
        >
          {/* El título es el primer slide, igual que en turf.design */}
          <SwiperSlide className="quotes__slide quotes__slide--head">
            <div className="quotes__head">
              <h2 className="quotes__title">{title}</h2>
              {description && <p className="quotes__desc">{description}</p>}
            </div>
          </SwiperSlide>

          {quotes.map((quote) => (
            <SwiperSlide key={quote.id} className="quotes__slide">
              <QuoteCard quote={quote} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Zonas de navegación: mitad izquierda = anterior, derecha = siguiente.
            Cada una lleva su cursor de círculo con flecha. */}
        {canHover && (
          <>
            <button
              type="button"
              className="quotes__nav quotes__nav--prev"
              aria-label="Anterior"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <button
              type="button"
              className="quotes__nav quotes__nav--next"
              aria-label="Siguiente"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default QuotesSlider;
