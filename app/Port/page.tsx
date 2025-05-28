import React from "react";
import Header from "@/components/ui/header";
import PortfolioGrid from "@/components/portfolio-grid";
import Footer from "@/components/ui/footer";

export const metadata = {
  title: "Portfolio Touch",
  description: "Page portfolio",
};

export default function PortPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }}>
      {/* Grid do Portfólio */}
      <PortfolioGrid />
      </div>
      <Footer/>
    </>
  );
}
