import { Checkbox } from "@nextui-org/checkbox";
import clsx from "clsx";
import {
  FaCircle,
  FaFire,
  FaWater,
  FaBolt,
  FaLeaf,
  FaSnowflake,
  FaFistRaised,
  FaSkullCrossbones,
  FaMountain,
  FaFeatherAlt,
  FaBrain,
  FaBug,
  FaGem,
  FaGhost,
  FaDragon,
  FaMoon,
  FaShieldAlt,
  FaMagic,
} from "react-icons/fa";
const pokemonTypes = [
  {
    type: "Normal",
    color: "text-gray-500",
    borderColor: "border-gray-500",
    icon: <FaCircle />,
  },
  {
    type: "Fire",
    color: "text-red-600",
    borderColor: "border-red-600",
    icon: <FaFire />,
  },
  {
    type: "Water",
    color: "text-blue-600",
    borderColor: "border-blue-600",
    icon: <FaWater />,
  },
  {
    type: "Electric",
    color: "text-yellow-500",
    borderColor: "border-yellow-500",
    icon: <FaBolt />,
  },
  {
    type: "Grass",
    color: "text-green-600",
    borderColor: "border-green-600",
    icon: <FaLeaf />,
  },
  {
    type: "Ice",
    color: "text-blue-400",
    borderColor: "border-blue-400",
    icon: <FaSnowflake />,
  },
  {
    type: "Fighting",
    color: "text-red-800",
    borderColor: "border-red-800",
    icon: <FaFistRaised />,
  },
  {
    type: "Poison",
    color: "text-purple-600",
    borderColor: "border-purple-600",
    icon: <FaSkullCrossbones />,
  },
  {
    type: "Ground",
    color: "text-yellow-700",
    borderColor: "border-yellow-700",
    icon: <FaMountain />,
  },
  {
    type: "Flying",
    color: "text-blue-300",
    borderColor: "border-blue-300",
    icon: <FaFeatherAlt />,
  },
  {
    type: "Psychic",
    color: "text-pink-600",
    borderColor: "border-pink-600",
    icon: <FaBrain />,
  },
  {
    type: "Bug",
    color: "text-green-500",
    borderColor: "border-green-500",
    icon: <FaBug />,
  },
  {
    type: "Rock",
    color: "text-yellow-900",
    borderColor: "border-yellow-900",
    icon: <FaGem />,
  },
  {
    type: "Ghost",
    color: "text-purple-800",
    borderColor: "border-purple-800",
    icon: <FaGhost />,
  },
  {
    type: "Dragon",
    color: "text-indigo-800",
    borderColor: "border-indigo-800",
    icon: <FaDragon />,
  },
  {
    type: "Dark",
    color: "text-gray-800",
    borderColor: "border-gray-800",
    icon: <FaMoon />,
  },
  {
    type: "Steel",
    color: "text-gray-600",
    borderColor: "border-gray-600",
    icon: <FaShieldAlt />,
  },
  {
    type: "Fairy",
    color: "text-pink-400",
    borderColor: "border-pink-400",
    icon: <FaMagic />,
  },
];
interface CustomCheckboxProps {
  type: string; // Tipo del Pokémon
  value: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  type,
  value,
}) => {
  // Buscar tipo correspondiente
  const pokemonType = pokemonTypes.find((p) => p.type === type) || {
    color: "text-gray-400", // Default color
    icon: <FaCircle />, // Default
    borderColor:"border-gray-400", 
  };

  return (
    <Checkbox
      aria-label={type}
      classNames={{
        base: clsx(
          "inline-flex items-center justify-start cursor-pointer ml-4 rounded-xl",
          "gap-2 border-2 border-transparent",
          "hover:bg-content2",
          "data-[selected=true]:bg-content1",
          `data-[selected=true]:border-primary`,
          
        ),
      }}
      value={value}
    >
      <div className={`flex items-center gap-2 ${pokemonType.color}`}>
        <span className="text-sm">{pokemonType.icon}</span>
        <span className="text-sm font-medium">{type}</span>
      </div>
    </Checkbox>
  );
};
