import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const ControlLabel = styled(FormControlLabel)`
  label {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #616161;
    padding: 8px;
  }
`;
const Root = styled("div")`
  display: flex;
  flex-direction: column;
  width: 306px;
  height: 182px;
  padding: 15px 23px;
  border: 1px solid #000000;
  border-radius: 5px;
  background: white;
  label {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    color: #616161;
  }
`;
const CheckBoxWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 16px;
  margin: 0;
`;
const Legend = styled("legend")`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.36px;
  color: #616161;
`;
const Header = styled(Typography)`
  font-size: 21px;
  font-weight: 600;
  line-height: 25.41px;
  width: 63px;
  height: 44px;
`;
export default function FavoritesFilter({
  handleShowFavorites,
}: {
  handleShowFavorites: (isTrue: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    handleShowFavorites(selected === "yes");
  }, [selected, handleShowFavorites]);

  const handleChange = (value: string) => () => {
    setSelected(selected === value ? null : value);
  };

  return (
    <section>
      <Header>Filter</Header>
      <Root>
        <Legend>Favorites?</Legend>
        <CheckBoxWrapper>
          <ControlLabel
            control={
              <Checkbox
                checked={selected === "yes"}
                onChange={handleChange("yes")}
                color="primary"
              />
            }
            label="Yes"
          />
          <ControlLabel
            control={
              <Checkbox
                checked={selected === "no"}
                onChange={handleChange("no")}
                color="primary"
              />
            }
            label="No"
          />
        </CheckBoxWrapper>
      </Root>
    </section>
  );
}
