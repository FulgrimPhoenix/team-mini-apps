import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import styles from "./Button.module.scss";

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
  icon?: ReactNode;
  variant?: "filled";
  size?: "sm" | "md" | "lg";
}

export const Button: FC<IButton> = ({
  icon,
  title,
  variant,
  size = "md",
  ...props
}) => {
  return (
    <button
      type={props.type}
      className={clsx(styles.button, {
        [styles["button-filled"]]: variant === "filled",
        [styles["sm"]]: size === "sm",
        [styles["md"]]: size === "md",
        [styles["lg"]]: size === "lg",
      })}
      {...props}
    >
      {icon ? <div>{icon}</div> : <></>}
      {title ? <span className={clsx(styles.title)}>{title}</span> : <></>}
    </button>
  );
};
