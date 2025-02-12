import SearchParamToggle from "./SearchParamToggle";
import useToggleShowMoreButton from "../../../hooks/useToggleShowMoreButton";
import Spinner from "../../../ui/Spinner";

export default function FilterByBrand({
  brands,
  isLoadingBrands,
}: {
  brands: Array<string> | undefined;
  isLoadingBrands?: boolean;
}) {
  const { showMore, showMoreButton } = useToggleShowMoreButton("brands");
  const brandsToDisplay = brands?.slice(0, 5);
  const showMoreBrands = brands?.slice(5);
  return (
    <div className="space-y-5">
      <h3 className="font-semibold">Brands</h3>
      {
        <ul className="max-h-96 min-h-28 overflow-y-auto">
          {isLoadingBrands ? (
            <Spinner displayStart={true} absoluteCenter={false} />
          ) : (
            brandsToDisplay?.map((brand) => (
              <SearchParamToggle
                key={brand}
                name={brand}
                urlParam="brand"
                type="checkbox"
                value={brand}
              />
            ))
          )}
          {showMore &&
            showMoreBrands?.map((brand) => (
              <SearchParamToggle
                key={brand}
                name={brand}
                urlParam="brand"
                type="checkbox"
                value={brand}
              />
            ))}
        </ul>
      }
      {showMoreBrands && showMoreBrands.length > 0 && showMoreButton}
    </div>
  );
}
