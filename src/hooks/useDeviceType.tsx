import { useState, useEffect } from "react";

function useDeviceType() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth <= 768); // Ajusta el ancho según lo que consideres "móvil".
    };

    checkDeviceType(); // Comprobar al inicio.
    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  return isMobile;
}

export default useDeviceType;
