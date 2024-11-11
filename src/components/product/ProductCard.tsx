import { FC } from "react";

import { Button } from "@nextui-org/Button";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/Card";
import Image from "next/image";
import { MdAddShoppingCart } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import useDeviceType from "@/hooks/useDeviceType";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
// Helper para formatear números grandes
const formatNumber = (num: number): string => {
  const units = ["", "K", "M", "B", "T", "P", "E"]; // Para miles, millones, billones, etc.
  let unitIndex = 0;

  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }

  return `${num.toFixed(1)}${units[unitIndex]}`;
};

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  imageUrl: string;
  discount?: number;
  sales: number;
  rating: number; // De 0 a 5 (ej: 4.5)
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  stock,
  description,
  imageUrl,
  discount,
  sales,
  rating,
}) => {
  const isMobile = useDeviceType();

  return (
    <Card
      
      key={`product-card-${id}`}
      className="w-full max-w-[280px] md:max-w-[240px] bg-white shadow-md rounded-lg p-3 relative transition-transform hover:scale-105 duration-300"
    >
      {/* Cinta diagonal */}
      {discount && (
        <>
          {!isMobile && (
            <div className="hidden sm:block absolute top-3 -left-7 -rotate-45 bg-gradient-to-r from-red-500 to-red-300 text-white text-[10px] font-bold px-7 py-1 shadow-lg">
              -{discount}% OFF
            </div>
          )}
          {isMobile && (
            <div className="block sm:hidden absolute top-2.5 -left-5 w-[80px] -rotate-45 bg-gradient-to-r from-red-500 to-yellow-500 text-white text-[8px] font-bold py-1 px-5 shadow-lg">
              -{discount}% OFF
            </div>
          )}
        </>
      )}

      {/* Card Header */}
      <CardHeader className="relative w-full h-[140px]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain rounded-md"
          priority
        />
        {/* Stock Status */}
        <div
          className={`absolute bottom-2 right-2 flex items-center space-x-1 px-2 py-1 text-xs font-bold bg-opacity-90 rounded-md ${
            stock > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {stock > 0 ? <BsCheckCircle size={14} /> : <BsXCircle size={14} />}
          <span>{stock > 0 ? "In Stock" : "Out of Stock"}</span>
        </div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-10 rounded-md"></div>
      </CardHeader>

      {/* Card Body */}
      <CardBody className="mt-3">
        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center">
          {/* Precio */}
          <div className="flex flex-col md:flex-row items-center space-x-2">
            <span className="text-base font-bold text-primary-500">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm font-bold text-neutral-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Botón Add to Cart */}
          <Button
            isIconOnly
            
            className={`rounded-full p-2 ${
              stock > 0
                ? "bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white shadow-md"
                : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
            }`}
            isDisabled={stock === 0}
          >
            <MdAddShoppingCart className="text-xl" />
          </Button>
        </div>

        {/* Product Name */}
        <h2 className="text-sm font-title text-neutral-900 mt-2 hover:text-primary-500 transition-colors line-clamp-2">
          {name}
        </h2>

        {/* Minimalist Sales and Rating */}
        <div className="flex justify-between items-center mt-2 text-xs text-neutral-500">
          <span>{formatNumber(sales)} sold</span>
          <span className="flex items-center">
            {rating.toFixed(1)} <AiFillStar className="text-blue-500 ml-1" />
          </span>
        </div>
      </CardBody>

      {/* Card Footer */}
      <CardFooter className="mt-2">
        <Button
        
color="primary"
     variant="ghost"
          href={`/product/${id}`}
          className="text-xs font-bold w-full shadow-lg  "
          endContent={<FaArrowUpRightFromSquare />}
        >
          View more details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
