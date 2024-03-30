import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

interface CardEffectProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const CardEffect: React.FC<CardEffectProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
<CardContainer className="inter-var">
  <CardBody className="bg-gray-50 dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:max-w-[40rem] h-auto rounded-xl p-6 border">
    <CardItem
      translateZ="50"
      className="text-xl font-bold text-neutral-600 dark:text-white"
    >
      {title}
    </CardItem>
    <CardItem
      as="p"
      translateZ="60"
      className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
    >
      {description}
    </CardItem>
    <CardItem translateZ="100" className="w-full mt-4">
      <div className="w-full h-[20rem] overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </CardItem>
  </CardBody>
</CardContainer>


  );
};