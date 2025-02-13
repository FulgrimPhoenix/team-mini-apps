import clsx from "clsx";
import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import styles from "./TextField.module.scss";

export const TextField: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return (
    <input
      className={clsx(styles.input)}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
};
