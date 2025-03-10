import { Product } from "../../types/productInterface";
import { useSlider } from "../../hooks/useSlider";

import ProductListCard from "./ProductListCard";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import LoadingSkeletonsList from "../../ui/LoadingSkeletonsList";
import LoadingSkeletonCard from "../../ui/ProductSkeletonCard";

export default function ProductsCarousel({
  products,
  groupNumber = 3,
  isLoading,
}: {
  products: Array<Product> | undefined;
  groupNumber?: number;
  isLoading: boolean;
}) {
  const {
    sliderContainerRef,
    indexOfItemsGroupToDisplay,
    setIndexOfItemsGroupToDisplay,
  } = useSlider();

  const groupedProducts = products?.reduce(
    (acc: Array<Array<Product>>, curr: Product, i) => {
      if (i == 0) acc.push([curr]);
      else if (i % groupNumber != 0) acc[acc.length - 1]?.push(curr);
      else acc.push([curr]);
      return acc;
    },
    [],
  );

  return (
    <div className="relative space-y-5">
      <ul className="flex justify-center gap-5">
        {groupedProducts?.map((_, i) => (
          <li
            key={i}
            className={`h-2 w-2 rounded-full ${i === indexOfItemsGroupToDisplay ? "bg-gray-600" : "bg-gray-200"}`}
          />
        ))}
      </ul>
      <div className="mx-auto flex flex-nowrap overflow-hidden">
        {indexOfItemsGroupToDisplay > 0 && (
          <button
            onClick={() => setIndexOfItemsGroupToDisplay((i) => i - 1)}
            className="absolute -left-3 top-1/3 z-10 flex rounded-full bg-gray-50 p-2 text-gray-700 shadow-border hover:shadow-borderLg"
          >
            <MdOutlineKeyboardArrowLeft size={24} />
          </button>
        )}
        {isLoading ? (
          <ul className="flex w-full flex-col gap-5 sm:flex-row">
            <LoadingSkeletonsList numberOfSkeletonsToRender={3}>
              <LoadingSkeletonCard />
            </LoadingSkeletonsList>
          </ul>
        ) : (
          <ul ref={sliderContainerRef} className="flex w-full duration-700">
            {groupedProducts?.map((groupOfProducts, index) => (
              <li key={index} className="flex flex-shrink-0 basis-full">
                <ul className="flex flex-1 flex-shrink-0 flex-col justify-around text-center sm:flex-row sm:text-start">
                  {groupOfProducts.map((product) => (
                    <ProductListCard key={product.id} product={product} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        {groupedProducts &&
          indexOfItemsGroupToDisplay < groupedProducts.length - 1 && (
            <button
              onClick={() => setIndexOfItemsGroupToDisplay((i) => i + 1)}
              className="absolute -right-3 top-1/3 flex rounded-full bg-gray-50 p-2 text-gray-700 shadow-border hover:shadow-borderLg"
            >
              <MdOutlineKeyboardArrowRight size={24} />
            </button>
          )}
      </div>
    </div>
  );
}
