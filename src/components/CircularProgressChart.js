import React from "react";
import { useState, useEffect } from "react";

function CircularProgressChart({ percentage }) {
    const radius = 80;
    const strokeWidth = 15;
    const normalizedRadius = radius - strokeWidth;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const [animatedOffset, setAnimatedOffset] = useState(circumference);

    // Animate the blue fill color
    useEffect(() => {
        const duration = 1000;
        const interval = 10;
        let start = 0;

        const timer = setInterval(() => {
            if (start < duration) {
                setAnimatedOffset(
                    circumference -
                        (percentage / 100) * circumference * (start / duration)
                );
                start += interval;
            } else {
                setAnimatedOffset(strokeDashoffset);
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [percentage, strokeDashoffset]);

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                stroke="lightgrey"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke="#007BFF"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset: animatedOffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <text
                x={radius}
                y={radius}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                fontSize="16"
                fontWeight="bold"
            >
                {percentage}%
            </text>
        </svg>
    );
}

export default CircularProgressChart;
