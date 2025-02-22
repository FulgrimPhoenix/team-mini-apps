import clsx from "clsx";
import styles from "./ToDo.module.scss";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { InputField, TasksList } from "../../components";

const ToDo: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = () => {
  return (
    <section className={clsx(styles.toDo)}>
      <div className={clsx(styles.container)}>
        <h2 className={clsx(styles.title)}>To Do List!</h2>
        <h3 className={clsx(styles.subtitle)}>A Sample React Todo list App</h3>
        <TasksList />
        <InputField />
      </div>
    </section>
  );
};

export default ToDo;
