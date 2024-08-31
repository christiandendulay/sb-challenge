import { FC, useState } from "react";
import { styled } from "@mui/system";

const SeeMore = styled("button")`
  font-weight: 600;
  font-size: 12px;
  line-height: 14.52px;
  color: #000000;
  margin: 12px 0 0;
  padding: 0;
  border: 0;
  background: initial;
`;

function TruncateText({
  text,
  maxLength,
  TextComponent,
}: {
  text: string;
  maxLength: number;
  TextComponent: FC<Record<string, unknown>>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  const displayedText = isExpanded ? text : `${text.slice(0, maxLength)}`;

  return (
    <>
      <TextComponent>{displayedText}</TextComponent>

      <SeeMore onClick={toggleExpansion}>
        {isExpanded ? "See Less" : "See More"}
      </SeeMore>
    </>
  );
}

export default TruncateText;
