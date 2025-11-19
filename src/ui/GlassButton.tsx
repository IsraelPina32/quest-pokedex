import React from "react";
import styled, { css } from "styled-components";

type Size = "sm" | "md" | "lg";
type Tone = "light" | "dark";

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  tone?: Tone;
  icon?: React.ReactNode;
}

const sizeStyles = {
  sm: css`padding: 6px 10px; font-size: 0.85rem; border-radius: 8px;`,
  md: css`padding: 10px 16px; font-size: 1rem; border-radius: 10px;`,
  lg: css`padding: 14px 20px; font-size: 1.05rem; border-radius: 12px;`,
};

const GlassBase = styled.button<{ $size: Size; $tone: Tone }>`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 0.3px;
  user-select: none;
  border: none;
  position: relative;
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 220ms ease, background 220ms ease;
  backdrop-filter: blur(8px);
  z-index: 2;
  -webkit-backdrop-filter: blur(8px); /* Safari */
  ${props => sizeStyles[props.$size]}
  ${({ $tone }) =>
    $tone === "light"
      ? css`
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.54);
          color: #0b0b0b;
          box-shadow: 0 6px 20px rgba(2,6,23,0.08);
        `
      : css`
          background: rgba(10,10,12,0.18);
          border: 1px solid rgba(255,255,255,0.06);
          color: #fff;
          box-shadow: 0 6px 24px rgba(0,0,0,0.6);
        `}

  &::before{
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02));
    mix-blend-mode: overlay;
    opacity: 0.9;
  }

  &:hover:not(:disabled) {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 18px 40px rgba(0,0,0,0.35);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.995);
  }

  &:focus-visible {
    outline: 3px solid rgba(82, 183, 136, 0.18);
    outline-offset: 4px;
  }

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }


  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; box-shadow: none; }
  }
`;


const Spinner = styled.span<{ $size: Size }>`
  display: inline-block;
  width: ${({ $size }) => ($size === "sm" ? 10 : $size === "md" ? 12 : 14)}px;
  height: ${({ $size }) => ($size === "sm" ? 10 : $size === "md" ? 12 : 14)}px;
  border: 2px solid rgba(255,255,255,0.2);
  border-top-color: rgba(255,255,255,0.9);
  border-radius: 50%;
  animation: spin 700ms linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;


export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  size = "md",
  tone = "dark",
  icon,
  disabled,
  ...rest
}) => {
  return (
    <GlassBase
      {...rest}
      $size={size}
      $tone={tone}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {rest["aria-busy"] ? <Spinner $size={size} /> : icon}
      {children && <span style={{ opacity: rest["aria-busy"] ? 0.85 : 1 }}>{children}</span>}
    </GlassBase>
  );
};

export default GlassButton;
