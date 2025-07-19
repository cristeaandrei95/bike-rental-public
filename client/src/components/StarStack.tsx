import { Box } from "@material";
import { FullStar, HalfStar, OutlineStar } from "@icons";

interface Props {
  stars: number;
  isRatable?: boolean;
  onRatingClick?: (rating: number) => void;
}

export default function StarStack({
  stars,
  isRatable = false,
  onRatingClick = (rating: number) => {},
}: Props) {
  return isRatable ? (
    <Box sx={{ display: "flex", "&:hover": { cursor: "pointer" } }}>
      <Box onClick={() => onRatingClick(1)}>
        {stars >= 1 ? <FullStar /> : <OutlineStar />}
      </Box>
      <Box onClick={() => onRatingClick(2)}>
        {stars >= 2 ? <FullStar /> : <OutlineStar />}
      </Box>
      <Box onClick={() => onRatingClick(3)}>
        {stars >= 3 ? <FullStar /> : <OutlineStar />}
      </Box>
      <Box onClick={() => onRatingClick(4)}>
        {stars >= 4 ? <FullStar /> : <OutlineStar />}
      </Box>
      <Box onClick={() => onRatingClick(5)}>
        {stars >= 5 ? <FullStar /> : <OutlineStar />}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex" }}>
      {stars >= 1 ? <FullStar /> : stars > 0.5 ? <HalfStar /> : <OutlineStar />}
      {stars >= 2 ? <FullStar /> : stars > 1.5 ? <HalfStar /> : <OutlineStar />}
      {stars >= 3 ? <FullStar /> : stars > 2.5 ? <HalfStar /> : <OutlineStar />}
      {stars >= 4 ? <FullStar /> : stars > 3.5 ? <HalfStar /> : <OutlineStar />}
      {stars === 5 ? (
        <FullStar />
      ) : stars > 4.5 ? (
        <HalfStar />
      ) : (
        <OutlineStar />
      )}
    </Box>
  );
}
