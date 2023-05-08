import Image from "next/image";
import { Inter } from "next/font/google";
import { fetchDataFromApi } from "@/utils/api";
import Wrapper from "@/components/Wrapper";
import type { Product, ProductEntity } from "@/utils/type";
import ProductCard from "@/components/ProductCard";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  productsEntity: ProductEntity[];
}
export default function Home({ productsEntity }: HomeProps) {
  return (
    <main className={`min-h-screen ${inter.className}`}>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Just A Shoe Store
          </div>
          <div className="text-md md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            Lorem ipsum dolor sit amet it. Porro vero hic suscipit maxime sunt
            quam libero reiciendis quisquam nemo unde? Facere soluta saepe harum
            illum quaerat quam incidunt id deserunt! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Doloremque, dolore? Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Eos saepe minima commodi?
            Cum ipsum, ipsa exercitationem, saepe nemo similique nisi,
            repellendus cumque quasi sapiente corrupti iure. Cum numquam enim
            vitae
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {productsEntity?.map((entity) => (
            <div key={entity.id} className="aspect-w-1 aspect-h-1">
              <ProductCard key={entity.id} productData={entity.attributes} />
            </div>
          ))}
        </div>
      </Wrapper>
    </main>
  );
}

export async function getStaticProps() {
  const { data } = await fetchDataFromApi("/api/products?populate=*");
  return {
    props: { productsEntity: data },
  };
}
