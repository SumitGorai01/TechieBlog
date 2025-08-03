import { useState, useEffect } from "react";

export default function useCooldown(seconds = 30) {
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (cooldown === 0) return;

        const interval = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [cooldown]);

    const startCooldown = () => {
        setCooldown(seconds);
    };

    return { cooldown, startCooldown };
}
