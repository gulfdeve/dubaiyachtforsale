import { notFound } from "next/navigation";

import type { Metadata } from "next";

import Link from "next/link";

import {

  FaWhatsapp,

  FaRuler,

  FaCalendarAlt,

  FaBed,

  FaUsers,

  FaAnchor,

  FaBolt,

  FaShieldAlt,

  FaCheckCircle,

} from "react-icons/fa";

import GtagConversionPageView from "@/components/GtagConversionPageView";

import InquiryForm from "@/components/InquiryForm";

import YachtGallery from "@/components/YachtGallery";

import YachtHeroGallery from "@/components/YachtHeroGallery";

import YachtMobileCta from "@/components/YachtMobileCta";

import {

  YachtHighlights,

  YachtTrustBar,

  YachtBuyingProcess,

  YachtLocationSection,

  YachtFaq,

  SimilarYachts,

} from "@/components/yacht/YachtDetailSections";

import yachtsData from "@/data/yachts.json";

import type { Yacht } from "@/types/yacht";



const yachts: Yacht[] = (yachtsData as Yacht[]).filter((y) => !y.hidden);



const WHATSAPP_BASE =

  "https://api.whatsapp.com/send?phone=971543379499&text=Hi!%20I%20am%20interested%20in%20the%20";



const TRUST_POINTS = [

  "Privately owned & meticulously maintained",

  "Full documentation available on request",

  "Sea trial can be arranged for serious buyers",

];



interface PageProps {

  params: Promise<{ slug: string }>;

}



export async function generateStaticParams() {

  return yachts.map((y) => ({ slug: y.slug }));

}



export async function generateMetadata({

  params,

}: PageProps): Promise<Metadata> {

  const { slug } = await params;

  const yacht = yachts.find((y) => y.slug === slug);

  if (!yacht) return {};

  return {

    title: `${yacht.name} for Sale | Yachts For Sale in Dubai`,

    description: `${yacht.name} — ${yacht.lengthFt}ft ${yacht.builder} ${yacht.type} for sale in ${yacht.location}. ${yacht.cabins} cabins, ${yacht.guests} guests. Contact us for pricing.`,

  };

}



function formatPrice(aed: number): string {

  if (!aed || aed === 0) return "Price on Request";

  if (aed >= 1_000_000) return `AED ${(aed / 1_000_000).toFixed(1)}M`;

  return `AED ${aed.toLocaleString()}`;

}



function getSimilarYachts(current: Yacht, all: Yacht[], limit = 3): Yacht[] {

  const others = all.filter((y) => y.slug !== current.slug);

  const sameType = others.filter((y) => y.type === current.type);

  const sameBuilder = others.filter((y) => y.builder === current.builder);

  const pool = [...sameType, ...sameBuilder, ...others];

  const seen = new Set<string>();

  const result: Yacht[] = [];

  for (const yacht of pool) {

    if (seen.has(yacht.slug)) continue;

    seen.add(yacht.slug);

    result.push(yacht);

    if (result.length >= limit) break;

  }

  return result;

}



export default async function YachtDetailPage({ params }: PageProps) {

  const { slug } = await params;

  const yacht = yachts.find((y) => y.slug === slug);

  if (!yacht) notFound();



  const whatsappUrl = `${WHATSAPP_BASE}${encodeURIComponent(yacht.name)}%20yacht%20for%20sale.%20Please%20send%20more%20details.`;

  const similarYachts = getSimilarYachts(yacht, yachts);



  const quickStats = [

    { icon: FaRuler, label: "Length", value: `${yacht.lengthFt}ft / ${yacht.lengthM}m` },

    { icon: FaCalendarAlt, label: "Year Built", value: String(yacht.year) },

    { icon: FaAnchor, label: "Builder", value: yacht.builder },

    { icon: FaBed, label: "Cabins", value: yacht.cabins === 0 ? "No Cabin" : `${yacht.cabins} Cabins` },

    { icon: FaUsers, label: "Capacity", value: `${yacht.guests} Guests` },

    { icon: FaBolt, label: "Max Speed", value: yacht.specs.maxSpeed },

  ];



  const perfSpecs = [

    { label: "Length Overall", value: `${yacht.lengthFt}ft / ${yacht.lengthM}m` },

    { label: "Beam", value: yacht.specs.beam },

    { label: "Draft", value: yacht.specs.draft },

    { label: "Engines", value: yacht.specs.engines },

    { label: "Max Speed", value: yacht.specs.maxSpeed },

    { label: "Cruising Speed", value: yacht.specs.cruisingSpeed },

    ...(yacht.decks ? [{ label: "Decks", value: yacht.decks }] : []),

    {

      label: "Cabins",

      value:

        yacht.cabins === 0

          ? "No Cabin"

          : `${yacht.cabins}${yacht.cabins > 1 ? " (all en-suite)" : ""}`,

    },

    { label: "Guest Capacity", value: `${yacht.guests} Guests` },

    ...(yacht.extendedSpecs ?? []),

  ];



  return (

    <>

      {slug === "notus-58ft-azimut-2002" ? <GtagConversionPageView /> : null}

      <YachtHeroGallery

        yachtName={yacht.name}

        images={yacht.images}

        imageCaptions={yacht.imageCaptions}

        formattedPrice={formatPrice(yacht.priceAED)}

        whatsappUrl={whatsappUrl}

        yachtType={yacht.type}

        yachtStatus={yacht.status}

        location={yacht.location}

        builder={yacht.builder}

        lengthFt={yacht.lengthFt}

        year={yacht.year}

      />



      {/* Quick stats — light spec band */}

      <section className="bg-[#FAFAF8] border-b border-[#E2DDD6]" aria-label="Yacht specifications summary">

        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-[#E2DDD6]">

          {quickStats.map(({ icon: Icon, label, value }) => (

            <div key={label} className="flex flex-col items-center justify-center py-5 sm:py-6 px-3 text-center bg-white lg:bg-transparent">

              <Icon className="text-[#C9A84C] mb-2" size={14} aria-hidden="true" />

              <p className="text-[#003057] font-medium text-sm leading-tight">{value}</p>

              <p className="text-[#6B7B8D] text-[0.55rem] uppercase tracking-[0.18em] mt-1">{label}</p>

            </div>

          ))}

        </div>

      </section>



      <YachtHighlights features={yacht.features} />



      <YachtGallery

        yachtName={yacht.name}

        images={yacht.images}

        imageCaptions={yacht.imageCaptions}

      />



      {/* Overview + sticky inquiry */}

      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 pb-28 lg:pb-20">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          <div className="lg:col-span-2 space-y-14 sm:space-y-16">

            <div>

              <p className="section-eyebrow mb-3">About This Yacht</p>

              <h2 className="font-display font-medium text-[2.25rem] sm:text-[2.75rem] text-[#003057] leading-tight mb-5">

                A Private Escape to

                <br className="hidden sm:block" />

                {" "}Luxury on the High Seas

              </h2>

              <div className="w-10 h-px bg-[#C9A84C] mb-6" />

              <p className="text-[#4B5A6B] leading-[1.85] text-base sm:text-[1.0625rem] max-w-prose">

                {yacht.description}

              </p>

            </div>



            <div>

              <p className="section-eyebrow mb-3">Equipment & Features</p>

              <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#003057] mb-5">

                What&apos;s On Board

              </h2>

              <div className="w-10 h-px bg-[#C9A84C] mb-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-[#EDEAE5]">

                {yacht.features.map((f) => (

                  <div key={f} className="flex items-start gap-3 py-3.5 border-b border-[#EDEAE5] pr-4">

                    <FaCheckCircle className="text-[#C9A84C] shrink-0 mt-0.5" size={12} aria-hidden="true" />

                    <span className="text-[#1D2B3A] text-sm leading-relaxed">{f}</span>

                  </div>

                ))}

              </div>

            </div>



            <div>

              <p className="section-eyebrow mb-3">Technical Details</p>

              <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#003057] mb-5">

                Specifications

              </h2>

              <div className="w-10 h-px bg-[#C9A84C] mb-6" />

              <div className="border border-[#E2DDD6] divide-y divide-[#E2DDD6]">

                {perfSpecs.map(({ label, value }, i) => (

                  <div

                    key={label}

                    className={`flex justify-between gap-6 px-5 py-3.5 text-sm ${

                      i % 2 === 0 ? "bg-[#FAFAF8]" : "bg-white"

                    }`}

                  >

                    <span className="text-[#6B7B8D] font-medium shrink-0">{label}</span>

                    <span className="text-[#1D2B3A] font-medium text-right max-w-[55%] leading-snug">

                      {value}

                    </span>

                  </div>

                ))}

              </div>

            </div>



            {yacht.insurance && (

              <div className="border border-[#E2DDD6] bg-[#FAFAF8] p-6 sm:p-8">

                <div className="flex items-center gap-2 mb-2">

                  <FaShieldAlt className="text-[#C9A84C]" size={14} aria-hidden="true" />

                  <p className="section-eyebrow">Insurance</p>

                </div>

                <h3 className="font-display font-medium text-xl text-[#003057] mb-5">

                  Marine Hull — Valid Until {yacht.insurance.validUntil}

                </h3>

                <div className="space-y-3 border-t border-[#E2DDD6] pt-4">

                  {[

                    ["Insurance Type", "Marine Hull"],

                    ["Hull Value", yacht.insurance.hullValue],

                    ["Third Party Liability", yacht.insurance.thirdPartyLiability],

                    ["Coverage", yacht.insurance.coverage],

                  ].map(([label, val]) => (

                    <div key={label} className="flex justify-between text-sm gap-4">

                      <span className="text-[#6B7B8D] shrink-0">{label}</span>

                      <span className="text-[#1D2B3A] font-medium text-right">{val}</span>

                    </div>

                  ))}

                </div>

              </div>

            )}



            <blockquote className="flex items-start gap-4 border-l-2 border-[#C9A84C] pl-5 py-1">

              <p className="text-[#4B5A6B] text-sm leading-relaxed italic max-w-prose">

                &ldquo;Privately owned and operated with meticulous care throughout its ownership.

                Full service records available. Sea trial can be arranged for serious buyers.&rdquo;

              </p>

            </blockquote>

          </div>



          <div className="lg:col-span-1" id="yacht-inquiry">

            <div className="sticky top-28 space-y-4">

              <div className="bg-[#003057] text-white p-6 shadow-lg">

                <p className="text-[#C9A84C] text-[0.6rem] uppercase tracking-[0.28em] mb-1">

                  Asking Price

                </p>

                <p className="font-display font-medium text-[2rem] leading-tight">

                  {formatPrice(yacht.priceAED)}

                </p>

                <p className="text-white/45 text-xs mt-2">

                  Contact us for full pricing &amp; availability

                </p>

              </div>



              <InquiryForm yachtName={yacht.name} yachtSlug={yacht.slug} />



              <a

                href={whatsappUrl}

                target="_blank"

                rel="noopener noreferrer"

                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white py-4 text-xs tracking-[0.15em] uppercase font-semibold transition-colors min-h-[48px]"

              >

                <FaWhatsapp size={15} aria-hidden="true" />

                Chat on WhatsApp

              </a>



              <ul className="space-y-2 pt-2">

                {TRUST_POINTS.map((point) => (

                  <li key={point} className="flex items-start gap-2 text-[#6B7B8D] text-[0.7rem] leading-relaxed">

                    <FaCheckCircle className="text-[#C9A84C] shrink-0 mt-0.5" size={10} aria-hidden="true" />

                    {point}

                  </li>

                ))}

              </ul>

            </div>

          </div>

        </div>

      </section>



      <YachtTrustBar />



      <YachtBuyingProcess yachtName={yacht.name} />



      <YachtLocationSection

        yachtName={yacht.name}

        location={yacht.location}

        whatsappUrl={whatsappUrl}

      />



      <YachtFaq />



      <SimilarYachts yachts={similarYachts} />



      {/* Final CTA */}

      <section className="bg-[#001220] py-20 sm:py-24 px-4 sm:px-6">

        <div className="max-w-2xl mx-auto text-center">

          <p className="text-[#C9A84C] text-[0.62rem] uppercase tracking-[0.32em] mb-4">

            Ready to Make {yacht.name} Yours?

          </p>

          <h2

            className="font-display font-medium text-white leading-tight mb-6"

            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}

          >

            Begin Your Inquiry Today

          </h2>

          <div className="w-10 h-px bg-[#C9A84C] mx-auto mb-7" />

          <p className="text-white/50 text-sm leading-[1.8] mb-10 max-w-lg mx-auto">

            {yacht.name} is a rare opportunity — a {yacht.lengthFt}ft {yacht.builder}{" "}

            {yacht.type.toLowerCase()} available in {yacht.location}. Our team can arrange

            viewings, sea trials, and provide full documentation on request.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <a

              href={whatsappUrl}

              target="_blank"

              rel="noopener noreferrer"

              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white px-10 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors min-h-[48px]"

            >

              <FaWhatsapp size={14} aria-hidden="true" />

              WhatsApp Us

            </a>

            <Link

              href="#yacht-inquiry"

              className="inline-flex items-center justify-center border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#001220] px-10 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors min-h-[48px]"

            >

              Send Inquiry

            </Link>

          </div>

        </div>

      </section>



      <YachtMobileCta whatsappUrl={whatsappUrl} yachtName={yacht.name} />



      <a

        href={whatsappUrl}

        target="_blank"

        rel="noopener noreferrer"

        aria-label="Chat on WhatsApp"

        className="hidden lg:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"

      >

        <FaWhatsapp size={26} />

      </a>

    </>

  );

}

