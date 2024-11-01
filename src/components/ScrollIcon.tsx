"use client";
import React from "react";
import "./ScrollIcon.css";

export default function ScrollIcon({ primary = "white", secondary = "black" }) {
  return (
    <span
      onClick={() => {
        console.log("Posun");
        // window.scroll({ top: window.scrollY + window.screenY * 0.9 });
        window.scroll(0, window.scrollY +window.innerHeight * 0.9); 
      }}
      className="fade-in"
    >
      <svg
        className="scroll-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="31"
        viewBox="0 0 16 31"
      >
        <g id="Desktop" transform="translate(-0.461 0.391)">
          <g id="Sustainability">
            <g id="ARROW">
              <g id="Arrow-2" data-name="Arrow">
                <rect
                  id="Rectangle"
                  width="16"
                  height="31"
                  rx="7"
                  transform="translate(0.461 -0.391)"
                  fill={primary}
                />
                <g id="Group-7" transform="translate(4.172 7.857)">
                  <g id="Group-6" transform="translate(0 10.592) rotate(-45)">
                    <circle
                      id="Oval"
                      cx="1.209"
                      cy="1.209"
                      r="1.209"
                      transform="translate(0 3.825)"
                      fill={secondary}
                    />
                    <path
                      id="Path-18"
                      d="M0,3.181V0"
                      transform="translate(0.739 0)"
                      fill="none"
                      stroke={secondary}
                      strokeWidth="1"
                      fillRule="evenodd"
                    />
                    <path
                      id="Path-18-Copy-2"
                      d="M0,3.181V0"
                      transform="translate(2.815 5.256) rotate(-90)"
                      fill="none"
                      stroke={secondary}
                      strokeWidth="1"
                      fillRule="evenodd"
                    />
                  </g>
                  <path
                    id="Path-21"
                    d="M4,11.181V0"
                    transform="translate(0.289 0)"
                    fill="none"
                    stroke={secondary}
                    strokeWidth="1"
                    fillRule="evenodd"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
}
