import Image, { StaticImageData } from "next/image";
import React from "react";
import "../../globals.css";
import Item1 from "../../public/assets/images/donate-items/item-1.png";
import Item2 from "../../public/assets/images/donate-items/item-2.png";
import Item3 from "../../public/assets/images/donate-items/item-3.png";
import Item4 from "../../public/assets/images/donate-items/item-4.png";
import Item5 from "../../public/assets/images/donate-items/item-5.png";
import Item6 from "../../public/assets/images/donate-items/item-6.png";
import Item7 from "../../public/assets/images/donate-items/item-7.png";
import Item8 from "../../public/assets/images/donate-items/item-8.png";
import "./Donate.css";

type DonateItem = {
  src: StaticImageData;
  itemName: string;
  price: number;
};

const donateItems: DonateItem[] = [
  { src: Item1, itemName: "Item 1", price: 50000 },
  { src: Item2, itemName: "Item 2", price: 25000 },
  { src: Item3, itemName: "Item 3", price: 20000 },
  { src: Item4, itemName: "Item 4", price: 15000 },
  { src: Item5, itemName: "Item 5", price: 10000 },
  { src: Item6, itemName: "Item 6", price: 5000 },
  { src: Item7, itemName: "Item 7", price: 2000 },
  { src: Item8, itemName: "Item 8", price: 500 },
];

const Donate: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-[30px]">
      <p className="text-xl text-lightGray font-semibold">Donate</p>
      <div className="w-full h-fit flex flex-row justify-between">
        {donateItems.map((item, index) => (
          <div
            key={index}
            className="w-fit h-fit flex flex-col gap-[26px] cursor-pointer move-up"
          >
            <div className="w-[100px] h-[100px] flex justify-center items-center rounded-[16px] border-[1px] border-white/20">
              <Image
                src={item.src}
                alt=""
                width={80}
                height={80}
                sizes="1200px"
              />
            </div>
            <div className="w-full h-fit flex flex-col gap-[5px] items-center">
              <p className="text-xs text-white/75 font-semibold uppercase tracking-wider">
                {item.itemName}
              </p>
              <p className="text-base text-lightGray font-semibold">
                {item.price.toLocaleString().replace(/,/g, ".")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donate;
