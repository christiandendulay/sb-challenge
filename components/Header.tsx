import { styled } from "@mui/system";
import SearchBox from "./Search";
import { usePathname } from "next/navigation";

const HeaderContainer = styled("header")`
  width: 100%;
  height: 96px;
  display: flex;
  justify-content: end;
  border: 1px 0px 0px 0px;
  padding: 30px 30.5px 21px 0;
  background: linear-gradient(0deg, #5469b4, #5469b4),
    linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
`;

const Header = () => {
  const pathName = usePathname();
  return (
    <HeaderContainer>{pathName === "/" ? <SearchBox /> : null}</HeaderContainer>
  );
};

export default Header;
