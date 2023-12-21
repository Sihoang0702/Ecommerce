import { useEffect, useState, useRef } from "react";

export default function useHover() {
  const [hovered, setHovered] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    function handleMouseOver() {
      setHovered(true);
    }

    function handleMouseOut() {
      setHovered(false);
    }

    const dom = nodeRef.current;

    if (dom) {
      dom.addEventListener("mouseover", handleMouseOver);
      dom.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (dom) {
        dom.removeEventListener("mouseover", handleMouseOver);
        dom.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  return {
    hovered,
    nodeRef,
  };
}
