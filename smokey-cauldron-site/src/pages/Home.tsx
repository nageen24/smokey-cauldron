import * as React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../lib/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Section } from '../components/Section'
import { useJson } from '../lib/useJson'
import {
  BANNER_IMAGES,
  GALLERY_IMAGES,
  FALLBACK_BANNER,
  FALLBACK_GALLERY,
  TASTE_SECTION_IMAGES,
} from '../data/imagePaths'

export function Home() {
  const [bannerFallback, setBannerFallback] = React.useState<Record<number, boolean>>({})
  const bannerSources = React.useMemo(
    () =>
      BANNER_IMAGES.map((src, i) =>
        bannerFallback[i] ? FALLBACK_BANNER[i] ?? FALLBACK_BANNER[0] : src,
      ),
    [bannerFallback],
  )
  const images = bannerSources.length ? bannerSources : FALLBACK_BANNER

  const [index, setIndex] = React.useState(0)
  const [tasteSelected, setTasteSelected] = React.useState(0)
  const [galleryPage, setGalleryPage] = React.useState(0)
  const [reviewIndex, setReviewIndex] = React.useState(0)
  const [galleryFallback, setGalleryFallback] = React.useState<Record<number, boolean>>({})

  type Review = { author: string; body: string; rating?: number; source?: string }
  type ReviewsData = { lastUpdatedISO?: string; reviews: Review[] }

  const fallbackReviews: ReviewsData = {
    reviews: [
      {
        author: 'Tariq Ahmed',
        body: "I had lunch here a few days ago. The food was good and the pasta was nice, but my friend's order took a bit longer to arrive. Overall a fun themed experience I would still recommend.",
        rating: 4,
      },
      {
        author: 'Fatima Malik',
        body: 'The food was delicious, especially the grilled chicken. Our order was taken and served quickly and the staff was very friendly. It does get busy on weekends so I suggest going a little early.',
        rating: 5,
      },
      {
        author: 'Ali Khan',
        body: "Visited with my family and we had a fantastic time. The ambiance is cozy and the Harry Potter theme is very well done. The biryani and steaks were superb — one of the best experiences in Islamabad.",
        rating: 5,
      },
      {
        author: 'Sara Iqbal',
        body: "What a delightful experience! The desserts were to die for, especially the chocolate cake. My friends and I enjoyed the vibrant atmosphere, and the staff was attentive without being intrusive.",
        rating: 5,
      },
      {
        author: 'Ali Khan',
        body: 'میں نے حال ہی میں یہاں کھانا کھایا اور تجربہ شاندار تھا۔ سروس بہت اچھی تھی، اور کھانے کا ذائقہ واقعی لاجواب تھا۔ خاص طور پر ان کی پاستا کی ڈش بہت پسند آئی۔',
        rating: 5,
      },
    ],
  }

  const { data: reviewsData } = useJson<ReviewsData>('/reviews.json', fallbackReviews)
  const reviews = (reviewsData.reviews?.length
    ? reviewsData.reviews
    : fallbackReviews.reviews
  )

  const gallerySources = React.useMemo(
    () =>
      GALLERY_IMAGES.map((src, i) =>
        galleryFallback[i] ? FALLBACK_GALLERY : src,
      ),
    [galleryFallback],
  )
  const GALLERY_LENGTH = 12
  const galleryList = gallerySources.length >= GALLERY_LENGTH
    ? gallerySources.slice(0, GALLERY_LENGTH)
    : [...GALLERY_IMAGES.slice(0, GALLERY_LENGTH)].map((src, i) =>
        galleryFallback[i] ? FALLBACK_GALLERY : src,
      )

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [images.length])

  return (
    <main>
      {/* Hero banner with name + tagline overlay */}
      <section className="relative w-full overflow-hidden bg-black">
        <div className="aspect-[21/9] min-h-[18rem] w-full overflow-hidden sm:min-h-[22rem] md:aspect-[3/1] md:min-h-[28rem]">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Restaurant ambiance"
            className="h-full w-full object-cover opacity-90"
            style={{ objectPosition: '50% 45%' }}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            onError={() => setBannerFallback((p) => ({ ...p, [index]: true }))}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-garamond text-3xl font-bold tracking-wide text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
            The Smokey Cauldron
          </h1>
          <p className="font-garamond mt-3 text-lg font-medium text-[var(--gold)] drop-shadow-md sm:text-xl md:text-2xl">
            A Wizard&apos;s Choice for Magical Dining
          </p>
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--gold)]/50 bg-black/60 p-1.5 text-[var(--gold)] hover:bg-black/80"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => setIndex((prev) => (prev + 1) % images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--gold)]/50 bg-black/60 p-1.5 text-[var(--gold)] hover:bg-black/80"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-3 left-4 right-4 flex justify-center">
          <div className="flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 w-4 rounded-full bg-white/30 transition',
                  i === index && 'w-6 bg-[var(--gold)]',
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* A Taste: large image + 4 thumbnails from menu jpeg */}
      <section className="relative bg-[var(--charcoal)] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-garamond mb-8 text-center text-2xl font-semibold text-[var(--gold)] sm:text-3xl">
            A Taste of the Cauldron
          </h2>
          <p className="font-garamond mb-8 text-center text-white/80">
            A quick peek at our magical menu.
          </p>
          <div className="mb-4 overflow-hidden rounded-2xl border border-[var(--gold)]/20 bg-black/30 shadow-xl">
            <img
              src={TASTE_SECTION_IMAGES[tasteSelected]}
              alt={`Menu highlight ${tasteSelected + 1}`}
              className="aspect-[21/9] w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TASTE_SECTION_IMAGES.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setTasteSelected(i)}
                className={cn(
                  'aspect-video w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition sm:w-28',
                  tasteSelected === i
                    ? 'border-[var(--gold)] ring-2 ring-[var(--gold)]/50'
                    : 'border-white/20 hover:border-[var(--gold)]/60',
                )}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[var(--burgundy)]/40" aria-hidden />
        <Section
          className="relative z-10"
          title="Our gallery"
          subtitle="A quick peek at the magical menu boards and ambiance."
          centerTitle
          titleClassName="font-garamond"
          subtitleClassName="font-garamond"
        >
          {(() => {
            const pageSize = 4
            const pageCount = Math.ceil(galleryList.length / pageSize)
            const pageItems = galleryList.slice(
              galleryPage * pageSize,
              galleryPage * pageSize + pageSize,
            )

            return (
              <>
                <div className="mb-3 flex items-center justify-between text-xs text-white/65">
                  <span>
                    {galleryPage * pageSize + 1}–
                    {Math.min((galleryPage + 1) * pageSize, galleryList.length)} of{' '}
                    {galleryList.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Previous gallery"
                      onClick={() =>
                        setGalleryPage((prev) => Math.max(0, prev - 1))
                      }
                      disabled={galleryPage === 0}
                      className="rounded-full border border-[var(--gold)]/40 bg-black/50 p-1.5 text-[var(--gold)] hover:bg-black/70 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next gallery"
                      onClick={() =>
                        setGalleryPage((prev) =>
                          Math.min(pageCount - 1, prev + 1),
                        )
                      }
                      disabled={galleryPage >= pageCount - 1}
                      className="rounded-full border border-[var(--gold)]/40 bg-black/50 p-1.5 text-[var(--gold)] hover:bg-black/70 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {pageItems.map((src, i) => {
                    const globalIdx = galleryPage * pageSize + i
                    return (
                      <motion.div
                        key={`${src}-${globalIdx}`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-md"
                      >
                        <img
                          src={src}
                          alt={`Restaurant gallery ${globalIdx + 1}`}
                          className="h-full w-full object-cover object-center opacity-95"
                          style={{ objectPosition: '50% 48%' }}
                          loading="lazy"
                          onError={() =>
                            setGalleryFallback((p) => ({ ...p, [globalIdx]: true }))
                          }
                        />
                      </motion.div>
                    )
                  })}
                </div>
              </>
            )
          })()}
        </Section>
      </section>

      {/* Invitation section - Hogwarts letters background */}
      <section
        className="relative min-h-[380px] overflow-hidden bg-[var(--charcoal)] bg-cover bg-center bg-no-repeat py-16 sm:py-20"
        style={{
          backgroundImage: "url('/images/invitation/invitation-bg.png')",
        }}
      >
        {/* <div className="absolute inset-0 bg-[var(--burgundy)]/40" /> */}
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <p className="font-garamond text-xl font-medium tracking-wide text-black sm:text-2xl">
            You&apos;re Invited to a Magical Feast.
          </p>
          <p className="font-garamond mt-3 text-base text-black sm:text-lg">
            Your table at The Smokey Cauldron awaits.
          </p>
          <p className="font-garamond mt-1 text-sm text-black sm:text-base">
            Step into the wizarding world.
          </p>
          <Link
            to="/reservation"
            className="mt-8 inline-block rounded-xl border-2 border-[var(--gold)] bg-[var(--gold)]/90 px-8 py-3.5 text-base font-semibold text-[var(--charcoal)] shadow-lg transition hover:bg-[var(--gold)] hover:shadow-[var(--gold)]/30"
          >
            Reserve Your Table
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[var(--burgundy)]/15 py-14 sm:py-16">
        <Section
          title="What customers say"
        
          centerTitle
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${reviewIndex * 100}%)`,
              }}
            >
              {reviews.map((review, idx) => (
                <article
                  key={`${review.author}-${idx}`}
                  className="min-w-full flex-shrink-0 px-2 sm:px-4"
                >
                  <div className="mx-auto max-w-xl rounded-2xl border border-[var(--gold)]/20 bg-black/40 p-6 text-center shadow-lg">
                    <div className="text-[0.8rem] font-semibold text-[var(--gold)]">
                      {Array.from({ length: review.rating ?? 5 })
                        .map(() => '★')
                        .join('')}{' '}
                      <span className="text-white/60 text-[0.7rem]">
                        ({review.rating ?? 5}.0)
                      </span>
                    </div>
                    <p className="mt-3 leading-relaxed text-white/85 sm:text-sm">
                      &ldquo;{review.body}&rdquo;
                    </p>
                    <div className="mt-4 text-[0.75rem] font-semibold text-[var(--gold)]">
                      — {review.author}
                    </div>
                    {review.source && (
                      <div className="mt-1 text-[0.65rem] text-white/55">
                        {review.source}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() =>
                  setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
                }
                className="rounded-full border border-[var(--gold)]/40 bg-black/50 p-2 text-[var(--gold)] hover:bg-black/70"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-1.5">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setReviewIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={cn(
                      'h-2 rounded-full transition-all',
                      i === reviewIndex
                        ? 'w-6 bg-[var(--gold)]'
                        : 'w-2 bg-white/30 hover:bg-white/50',
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next review"
                onClick={() =>
                  setReviewIndex((prev) => (prev + 1) % reviews.length)
                }
                className="rounded-full border border-[var(--gold)]/40 bg-black/50 p-2 text-[var(--gold)] hover:bg-black/70"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </Section>
      </section>
    </main>
  )
}
