import React from "react";
import { Badge } from "@/components/ui/badge";

interface IProps {
  text: string;
  bgColor: string;
  textColor: string;
}

function TMBadge({ text, bgColor, textColor }: IProps) {
  console.log("🚀 ~ file: TMBadge.tsx:11 ~ TMBadge ~ textColor:", textColor);
  console.log("🚀 ~ file: TMBadge.tsx:11 ~ TMBadge ~ bgColor:", bgColor);
  return (
    <Badge
      className={`bg-[${bgColor}] hover:bg-[${bgColor}] text-[${textColor}]`}
    >
      <span className="">{text}</span>
    </Badge>
  );
}

export default TMBadge;
