import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <main className="p-4 flex flex-wrap">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
