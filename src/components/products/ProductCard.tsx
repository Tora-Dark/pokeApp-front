import { FC } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Badge } from "flowbite-react";
import Image from "next/image";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { Chip } from "@nextui-org/chip";
interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    stock: number;
}

const ProductCard: FC<ProductCardProps> = ({ id, name, stock, price, description, imageUrl }) => {
    return (
        <Card key={`product-card-${id}`} className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <Image
                    width={100}
                    height={100}
                    src={imageUrl}
                    alt={name}
                    className="object-cover w-full h-48 rounded-t-lg"
                />
            </CardHeader>
            <CardBody>
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-gray-600">{description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-green-600">${price}</span>
                    {stock > 0 ? (<Chip color="warning" variant="faded">En stock</Chip>) : (<Chip color="danger" variant="faded">Sin existencias</Chip>)}
                </div>
            </CardBody>
            <CardFooter className="flex justify-between">
                <Button color="primary" className="flex items-center">
                    <MdAddShoppingCart className="h-4 w-4 mr-2" />
                    Añadir al carrito
                </Button>
                <Button color="danger" variant="flat" className="flex items-center">
                    <IoIosHeartEmpty className="h-4 w-4 mr-2" />
                    Favorito
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
