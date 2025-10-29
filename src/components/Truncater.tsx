"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const WORD_LIMIT = 30;

interface TProps {
  text: string;
  limit?: number;
}

export default function Truncater({ text, limit = WORD_LIMIT }: TProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayText, setDisplayText] = useState(() => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  });

  const words = text.split(" ");
  const isTruncated = words.length > limit;

  useGSAP(
    () => {
      gsap.fromTo(
        ".truncater-text",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    },
    { dependencies: [isExpanded] }
  );

  const toggleText = () => {
    if (!isTruncated) return;
    setIsExpanded((prev) => !prev);
    const newText =
      !isExpanded && isTruncated
        ? text
        : words.slice(0, limit).join(" ") + "...";
    setDisplayText(newText);
  };

  return (
    <p className="mb-5 text-foreground leading-relaxed">
      <span className="truncater-text inline-block">{displayText}</span>{" "}
      {isTruncated && (
        <button
          onClick={toggleText}
          className="text-primary hover:underline font-medium transition-colors"
        >
          {isExpanded ? "View less" : "View more"}
        </button>
      )}
    </p>
  );
}
