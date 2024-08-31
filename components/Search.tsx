import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";

const SearchInput = styled(TextField)`
  width: 506px;
  border-radius: 10px;
  border: 0;

  background: #d9d9d9;

  input {
    padding: 5px 24.8px;
    border-radius: 10px;
    height: 45px;
  }
`;

const SearchWrapper = styled("form")`
  border-radius: 10px;
  border: 0;

  box-shadow: 0 4px 4px 0 #00000040;
  width: 506px;
  padding: 0;
  margin: 0;
  background: #d9d9d9;
`;
export default function SearchBox() {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  return (
    <SearchWrapper
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <SearchInput
        placeholder="Search here ..."
        variant="outlined"
        value={query}
        onChange={handleInputChange}
      />
    </SearchWrapper>
  );
}
