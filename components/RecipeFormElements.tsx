import { styled } from "@mui/system";
import TextAreaField from "./inputs/TextAreaField";
import { Button } from "@mui/material";

export const DescriptionTextArea = styled(TextAreaField)`
  height: 75px;
  margin: 0 0 18px;
`;

export const InstructionTextArea = styled(TextAreaField)`
  height: 135px;
  margin: 0 0 10px;
`;

export const IngredientsTextArea = InstructionTextArea;

export const NameInputWrapper = styled("div")`
  margin: 0 0 11px;
`;
export const EmailInputWrapper = styled("div")`
  margin: 0 0 18px;
`;

export const TitleInputWrapper = styled("div")`
  margin: 0 0 28px;
`;

export const FormWrapper = styled("div")`
  display: flex;
  width: 100%;
  gap: 50px;
  padding: 10px 113px 0 44px;
  flex-wrap: nowrap;
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  margin: 26px 0 0;
  gap: 16px;
`;

export const FieldWrapper = styled("div")`
  width: 100%;
`;

export const SaveButton = styled(Button)`
  width: 152px;
  height: 36px;
  padding: 0 16px 0 12px;
  border-radius: 4px;
  background: #435490;
  color: white;
  box-shadow: 0px 1px 5px 0px #00000033;
  box-shadow: 0px 3px 1px 0px #0000001f;
  box-shadow: 0px 2px 2px 0px #00000024;
  font-family: Inter;
  font-size: 24px;
  font-weight: 500;
  line-height: 29.05px;
  letter-spacing: 0.0125em;
  text-align: left;
`;

export const DeleteButton = styled(SaveButton)`
  background: #ee6400;
`;
