import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { animate } from "framer-motion";

const Counter = ({ target, duration, suffix = "" }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, target, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });

      return () => controls.stop();
    }
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export default Counter;
