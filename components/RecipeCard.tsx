import { Star, StarBorder } from "@mui/icons-material";
import { Card, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/system";
import TruncateText from "./TruncateText";
import { Recipe } from "@/types/recipe";
import { useRouter } from "next/router";
import Link from "next/link";

const OverlayContainer = styled("div")`
  position: relative;
  height: 224px;
  border-radius: 15px;
  min-width: 310.54px;
`;

const FavoriteButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #ffff00;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const CardWrapper = styled(Card)`
  display: flex;
  width: 100%;
  max-width: 850px;
  border: 1px;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px #00000040;
  padding: 0 18px 16px 13px;
`;

const Title = styled(Typography)`
  font-weight: 600;
  font-size: 32px;
  line-height: 38.73px;
`;

const Description = styled(Typography)`
  font-weight: 600;
  font-size: 15px;
  line-height: 18.15px;
`;
const ContentWrapper = styled("div")`
  padding: 22px 24.46px 16px 28px;
  width: 100%;
`;
const ContentFooter = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
`;

const Author = Description;
const DateAdded = Description;

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const RecipeCard = ({
  recipe,
  onToggleFavorite,
}: {
  recipe: Recipe;
  onToggleFavorite: () => void;
}) => {
  const { image, title, description, name, dateCreated } = recipe;
  const router = useRouter();
  return (
    <CardWrapper>
      <OverlayContainer>
        <Image
          src={image || "/placeholder.png"}
          alt={`Recipe image of ${name}`}
          fill
        />
        <FavoriteButton
          aria-label="add to favorites"
          onClick={onToggleFavorite}
        >
          {recipe.isFavorite ? <Star /> : <StarBorder />}
        </FavoriteButton>
      </OverlayContainer>

      <ContentWrapper>
        <Link href={`/recipe/${title}`}>
          <Title>{title}</Title>
        </Link>
        <TruncateText
          TextComponent={Description}
          text={description}
          maxLength={200}
        />

        <ContentFooter>
          <Author>{`Added by: ${name}`}</Author>
          <DateAdded>{`Date: ${new Date(dateCreated).toLocaleDateString(
            "en-US",
            options
          )}`}</DateAdded>
        </ContentFooter>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default RecipeCard;
