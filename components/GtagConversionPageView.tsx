import Script from "next/script";

export default function GtagConversionPageView() {
  return (
    <Script id="gtag-conversion-notus" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('event', 'conversion_event_page_view', {});
      `}
    </Script>
  );
}
