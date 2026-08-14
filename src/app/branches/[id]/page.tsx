import Link from "next/link"
import { notFound } from "next/navigation"
import { Card } from "@/components/ui/card"
import branchBg from "@/assets/branch-bg.jpg"
import Image from "next/image"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Navigation,
  ArrowLeft,
  Facebook,
  Instagram,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { BRANCHES, getBranchById } from "@/lib/branches-data"

export function generateStaticParams() {
  return BRANCHES.map((b) => ({ id: b.id }))
}

export default async function BranchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const branch = getBranchById(id)
  if (!branch) notFound()

  const branchImages = branch.images ?? []

  const info = [
    { icon: Phone, label: "Phone", value: branch.phone },
    ...(branch.email
      ? [{ icon: Mail, label: "Email", value: branch.email }]
      : []),
    { icon: MapPin, label: "Address", value: branch.address },
    { icon: Clock, label: "Hours", value: branch.hours },
  ]

  const mapEmbedSrc = `https://www.google.com/maps?q=${branch.mapQuery}&z=16&output=embed`

  return (
    <div className="min-h-screen bg-[#0B3D26]">
      {/* Pure-CSS lightbox: each photo has a #photo-N target div, hidden by default,
          shown via :target when a thumbnail (or nav arrow) links to it.
          Stacking: backdrop (z-0) < image (z-10) < controls (z-20), so clicking the
          padding area closes it, clicking the photo or a button doesn't. */}
      {branchImages.length > 0 && (
        <style>{`
        .lightbox {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 50;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(6px);
          padding: 4.5rem 2.75rem 5rem;
        }

        .lightbox:target {
          display: flex;
        }

        .lightbox-backdrop {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .lightbox-image-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .lightbox-image-wrap img {
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .lightbox {
            padding: 4rem 2.75rem 4.5rem;
          }
        }

        @media (min-width: 1024px) {
          .lightbox {
            padding: 4rem 6.5rem;
          }
        }
      `}</style>
      )}

      {/* HERO */}
      <section className="relative pt-24 sm:pt-32 pb-10 sm:pb-14 overflow-hidden">
        {/* mesh gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 90% at 15% 0%, #E9FBE8 0%, transparent 55%), radial-gradient(90% 80% at 85% 10%, #CFF3D6 0%, transparent 60%), linear-gradient(160deg, #F4FDF4 0%, #E4F7E6 45%, #CDEED2 100%)",
          }}
        />
        {/* blobs */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[130px] opacity-80"
          style={{
            background:
              "radial-gradient(circle, rgba(31,149,82,0.4), rgba(167,232,107,0.15) 70%)",
          }}
        />
        <div
          className="absolute top-20 right-[8%] w-[220px] h-[220px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(79,201,123,0.4), transparent 70%)",
          }}
        />
        <div className="absolute inset-0">
          <Image
            src={branchBg}
            alt=""
            fill
            className="object-cover opacity-70 mix-blend-luminosity"
          />
        </div>
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#0B3D26 1px, transparent 1px), linear-gradient(90deg, #0B3D26 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            href="/branches"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#4C6B4C] hover:text-[#145C36] transition mb-5 sm:mb-6"
          >
            <ArrowLeft size={14} />
            All branches
          </Link>

          <p
            className="text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-3 sm:mb-4 font-mono font-semibold bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(100deg, #145C36, #4FC97B)",
            }}
          >
            {branch.area}
          </p>
          <h1 className="font-serif py-1 text-3xl sm:text-5xl md:text-6xl font-semibold">
            <span className="text-[#0B2E1C]">{branch.name} </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #145C36 0%, #1F9552 40%, #4FC97B 70%, #A7E86B 100%)",
              }}
            >
              Branch
            </span>
          </h1>
          <p className="text-[#2E4E38]/80 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            {branch.blurb}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative pb-14 sm:pb-24 py-16 sm:py-20 overflow-hidden">
        {/* dark mesh, for light/dark rhythm against the hero */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(90% 70% at 100% 0%, rgba(79,201,123,0.22), transparent 55%), radial-gradient(70% 60% at 0% 100%, rgba(167,232,107,0.16), transparent 55%), linear-gradient(160deg, #0B3D26, #0E4A2D 55%, #0B3D26)",
          }}
        />
        <div
          className="absolute top-1/3 right-[6%] w-[340px] h-[340px] rounded-full blur-[120px] opacity-70 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(79,201,123,0.35), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-[4%] w-[300px] h-[300px] rounded-full blur-[110px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(167,232,107,0.3), transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6 sm:gap-8 lg:gap-10">
            {/* INFO */}
            <Card className="h-full p-5 sm:p-6 bg-white border-0 rounded-2xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #1F9552, #4FC97B, #A7E86B)",
                }}
              />
              <div className="flex items-center gap-2 mb-5 sm:mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4FC97B] opacity-75" />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #1F9552, #4FC97B)",
                    }}
                  />
                </span>
                <p className="text-xs uppercase tracking-[0.2em] text-[#145C36] font-mono font-semibold">
                  Clinic Details
                </p>
              </div>

              <dl className="divide-y divide-[#DCEFD6]">
                {info.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 py-3.5 sm:py-4 first:pt-0 last:pb-0"
                  >
                    <div
                      className="shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #1F9552, #4FC97B)",
                      }}
                    >
                      <item.icon size={15} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <dt className="text-[11px] uppercase tracking-wider text-[#7A9B7E] font-mono">
                        {item.label}
                      </dt>
                      <dd className="text-sm sm:text-[15px] text-[#0B2E1C] font-mono break-words mt-0.5">
                        {item.label === "Phone" ? (
                          <a
                            href={`tel:${item.value.replace(/\s+/g, "")}`}
                            className="hover:text-[#1F9552] transition"
                          >
                            {item.value}
                          </a>
                        ) : item.label === "Email" ? (
                          <a
                            href={`mailto:${item.value}`}
                            className="hover:text-[#1F9552] transition"
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
                {(branch.facebook || branch.instagram) && (
                  <div className="mt-6 pt-5 border-t border-[#DCEFD6]">
                    <p className="text-[11px] uppercase tracking-wider text-[#7A9B7E] font-mono mb-3">
                      Social Media
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {branch.facebook && (
                        <a
                          href={branch.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F1FAEE] border border-[#DCEFD6] text-sm text-[#0B2E1C] hover:border-[#1F9552] hover:text-[#145C36] transition"
                        >
                          <Facebook size={16} />
                          Facebook
                        </a>
                      )}

                      {branch.instagram && (
                        <a
                          href={branch.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F1FAEE] border border-[#DCEFD6] text-sm text-[#0B2E1C] hover:border-[#1F9552] hover:text-[#145C36] transition"
                        >
                          <Instagram size={16} />
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </dl>
            </Card>

            {/* MAP */}
            <Card className="relative overflow-hidden bg-white border-0 rounded-2xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.4)]">
              <div
                className="absolute top-0 left-0 right-0 h-1 z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #1F9552, #4FC97B, #A7E86B)",
                }}
              />
              <div className="pointer-events-none absolute top-6 left-3 w-6 h-6 border-t-2 border-l-2 border-[#4FC97B] rounded-tl-md z-10" />
              <div className="pointer-events-none absolute top-6 right-3 w-6 h-6 border-t-2 border-r-2 border-[#4FC97B] rounded-tr-md z-10" />
              <div className="pointer-events-none absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#4FC97B] rounded-bl-md z-10" />
              <div className="pointer-events-none absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#4FC97B] rounded-br-md z-10" />

              <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-[#DCEFD6]">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7A9B7E] font-mono">
                  Find Us
                </p>
                <a
                  href={branch.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, #145C36, #1F9552)",
                  }}
                >
                  <Navigation size={14} className="text-[#1F9552]" />
                  Get Directions
                </a>
              </div>

              <div className="relative w-full aspect-[16/9] sm:aspect-[4/3]">
                <iframe
                  src={mapEmbedSrc}
                  title={`${branch.name} branch location map`}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Card>
          </div>

          {/* GALLERY - thumbnails link to #photo-N, matching lightbox div shown via :target */}
          {branchImages.length > 0 && (
            <div className="mt-6 sm:mt-8">
              <Card className="p-4 sm:p-5 lg:p-6 bg-white border-0 rounded-2xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #1F9552, #4FC97B, #A7E86B)",
                  }}
                />
                <p className="text-xs uppercase tracking-[0.2em] text-[#145C36] font-mono font-semibold mb-4 sm:mb-5">
                  Branch Photos
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
                  {branchImages.map((src, i) => (
                    <a
                      key={i}
                      href={`#photo-${i}`}
                      className="relative block aspect-square rounded-xl overflow-hidden border border-[#DCEFD6] group"
                    >
                      <Image
                        src={src}
                        alt={`${branch.name} branch photo ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX MODALS - one per photo, shown only when URL hash matches its id. */}
      {branchImages.map((src, i) => (
        <div key={i} id={`photo-${i}`} className="lightbox">
          {/* Backdrop - fills the whole overlay, sits behind the image, closes on click */}
          <a href="#" aria-label="Close" className="lightbox-backdrop" />

          <a
            href="#"
            aria-label="Close"
            className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-black/60 hover:bg-black/80 sm:bg-white/10 sm:hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X size={20} />
          </a>

          {i > 0 && (
            <a
              href={`#photo-${i - 1}`}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-black/60 hover:bg-black/80 sm:bg-white/10 sm:hover:bg-white/20 flex items-center justify-center text-white transition"
            >
              <ChevronLeft size={22} />
            </a>
          )}

          {i < branchImages.length - 1 && (
            <a
              href={`#photo-${i + 1}`}
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-black/60 hover:bg-black/80 sm:bg-white/10 sm:hover:bg-white/20 flex items-center justify-center text-white transition"
            >
              <ChevronRight size={22} />
            </a>
          )}

          {/* Image wrap sits above the backdrop but is non-interactive (pointer-events: none)
              so a tap on the photo itself passes through to the backdrop underneath and closes too -
              only the buttons (z-20, real elements) intercept clicks. */}
          <div className="lightbox-image-wrap">
            <Image
              src={src}
              alt={`${branch.name} branch photo ${i + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <p className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/80 text-xs sm:text-sm font-mono bg-black/40 sm:bg-transparent px-2.5 py-1 sm:px-0 sm:py-0 rounded-full pointer-events-none">
            {i + 1} / {branchImages.length}
          </p>
        </div>
      ))}

      {/* Keyboard controls for the lightbox: ArrowLeft/ArrowRight navigate, Escape/Enter close.
          Reads/writes location.hash - the same #photo-N mechanism the :target CSS above uses,
          so no React state or client component is needed. */}
      {branchImages.length > 0 && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var total = ${branchImages.length};
                function currentIndex() {
                  var m = location.hash.match(/^#photo-(\\d+)$/);
                  return m ? parseInt(m[1], 10) : null;
                }
                function goTo(i) {
                  history.replaceState(null, '', location.pathname + location.search + '#photo-' + i);
                }
                function close() {
                  history.replaceState(null, '', location.pathname + location.search);
                }
                document.addEventListener('keydown', function (e) {
                  var idx = currentIndex();
                  if (idx === null) return;
                  if (e.key === 'Escape' || e.key === 'Enter') {
                    e.preventDefault();
                    close();
                  } else if (e.key === 'ArrowLeft' && idx > 0) {
                    e.preventDefault();
                    goTo(idx - 1);
                  } else if (e.key === 'ArrowRight' && idx < total - 1) {
                    e.preventDefault();
                    goTo(idx + 1);
                  }
                });
              })();
            `,
          }}
        />
      )}
    </div>
  )
}
