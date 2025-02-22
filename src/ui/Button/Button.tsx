import clsx from "clsx";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
} from "react";
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

const Button: FC<IButton> = React.memo(
  ({ icon, title, variant, size = "md", ...props }) => {
    console.log("button", title);

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
  },
  (prev, next) =>
    prev.disabled === next.disabled &&
    prev.title === next.title &&
    prev.icon === next.icon
);

export default Button;
