import type { Metadata } from "next";
import YachtListingsClient from "./YachtListingsClient";
import yachtsData from "@/data/yachts.json";
import type { Yacht } from "@/types/yacht";

export const metadata: Metadata = {
  title: "Yachts for Sale",
  description:
    "Browse our full collection of luxury yachts for sale in Dubai. Motor yachts, sport cruisers, superyachts and more. Expert brokerage services.",
};

export default function YachtsPage() {
  const yachts: Yacht[] = yachtsData as Yacht[];
  return <YachtListingsClient yachts={yachts} />;
}
