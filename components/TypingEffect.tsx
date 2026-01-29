import React, { useState, useEffect, useRef, memo } from 'react';

interface TypingEffectProps {
    text: string;
    speed?: number;
    delay?: number;
    repeatDelay?: number;
    className?: string;
    onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
    text,
    speed = 50,
    delay = 0,
    repeatDelay,
    className = "",
    onComplete
}) => {
    const [display, setDisplay] = useState("");
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        let timeoutId: NodeJS.Timeout;

        // Reset loop
        const loop = (currentIndex: number, isDeleting: boolean) => {
            if (!mountedRef.current) return;

            let nextSpeed = speed;

            if (!isDeleting) {
                if (currentIndex < text.length) {
                    // Typing
                    setDisplay(text.substring(0, currentIndex + 1));
                    timeoutId = setTimeout(() => loop(currentIndex + 1, false), speed);
                } else {
                    // Finished typing
                    if (repeatDelay) {
                        timeoutId = setTimeout(() => loop(currentIndex, true), repeatDelay);
                    } else if (onComplete) {
                        onComplete();
                    }
                }
            } else {
                // Deleting
                if (currentIndex > 0) {
                    setDisplay(text.substring(0, currentIndex - 1));
                    timeoutId = setTimeout(() => loop(currentIndex - 1, true), speed / 2);
                } else {
                    // Finished deleting, restart
                    timeoutId = setTimeout(() => loop(0, false), 500);
                }
            }
        };

        // Initial delay
        timeoutId = setTimeout(() => {
            loop(0, false);
        }, delay);

        return () => {
            mountedRef.current = false;
            clearTimeout(timeoutId);
        };
    }, [text, speed, delay, repeatDelay, onComplete]);

    return (
        <span className={className}>
            {display}
            <span className="animate-pulse">_</span>
        </span>
    );
};

export default memo(TypingEffect);
