import { useState } from "react";
import {
  Select as MaterialUISelect,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const Select = styled(MaterialUISelect)`
  width: 306px;
  height: 35px;
  border: 1px solid #000000;
  border-radius: 5px;

  font-size: 21px;
  font-weight: 600;
  line-height: 25.41px;
  text-align: left;
  color: #616161;
  background: white;
`;
const Option = styled(MenuItem)`
  font-size: 21px;
  font-weight: 600;
  line-height: 25.41px;
`;

const Header = styled(Typography)`
  font-size: 21px;
  font-weight: 600;
  line-height: 25.41px;
  margin: 0 0 15px;
`;
export default function SortBy() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <section>
      <Header>Sort by Title</Header>
      <Select
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Select Option" }}
      >
        <Option value="" disabled>
          Select
        </Option>
        <Option value="option1">ASC</Option>
        <Option value="option2">DESC</Option>
      </Select>
    </section>
  );
}
