import { BackIcon } from "@/src/assets";
import { styled, Typography } from "@mui/material";
import Link from "next/link";

const BackWrapper = styled("div")`
  display: flex;
  align-items: center;
  margin: 0 0 43px;
`;

const BackText = styled(Typography)`
  font-size: 36px;
  font-weight: 400;
  line-height: 43.57px;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const RouteBack = () => {
  return (
    <BackWrapper>
      <BackLink href={"/"}>
        <BackIcon aria-hidden /> <BackText>BackIcon</BackText>
      </BackLink>
    </BackWrapper>
  );
};

export default RouteBack;
