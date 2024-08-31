import { styled } from "@mui/system";
import FavoritesFilter from "./FavoritesFilter";
import SortBy from "./SortBy";

const Root = styled("div", {
  shouldForwardProp: (prop) => prop !== "isEmpty",
})<{ isEmpty: boolean }>(({ isEmpty }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "147px",
  visibility: isEmpty ? "hidden" : "initial",
  height: "100%",
}));

export const FilterColumn = ({
  isEmpty = false,
  handleShowFavorites,
}: {
  isEmpty: boolean;
  handleShowFavorites: (isTrue: boolean) => void;
}) => {
  return (
    <Root isEmpty={isEmpty}>
      <SortBy />
      <FavoritesFilter handleShowFavorites={handleShowFavorites} />
    </Root>
  );
};

export default FilterColumn;
