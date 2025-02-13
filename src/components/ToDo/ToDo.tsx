import clsx from "clsx";
import styles from "./ToDo.module.scss";
import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Task } from "../../ui/Task/Task";
import { TextField } from "../../ui/TextField/TextField";
import { Button } from "../../ui/Button/Button";

export interface Itask {
  [key: string]: {
    id: string;
    title: string;
    status: boolean;
    isEdit: boolean;
  };
}

export const ToDo: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = () => {
  const [tasks, setTasks] = useState<Itask>({});
  const [newTaskValue, setNewTaskValue] = useState("");
  const tasksArray = useMemo(() => Object.values(tasks), [tasks]);

  const addTask = () => {
    const taskId = Date.now();
    setTasks((prev) => ({
      ...prev,
      [taskId]: {
        id: taskId,
        title: newTaskValue,
        status: false,
        isEdit: false,
      },
    }));
    setNewTaskValue("");
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskValue(e.target.value);
  };

  useEffect(() => {
    setNewTaskValue("");
  }, [tasks]);

  return (
    <section className={clsx(styles.toDo)}>
      <div className={clsx(styles.container)}>
        <h2 className={clsx(styles.title)}>To Do List!</h2>
        <h3 className={clsx(styles.subtitle)}>A Sample React Todo list App</h3>
        <ul style={{ padding: "0" }}>
          {tasksArray.map((el) => (
            <Task
              key={el.id}
              title={el.title}
              id={el.id}
              status={el.status}
              isEdit={el.isEdit}
              setTasks={setTasks}
            />
          ))}
        </ul>
        <div className={styles["input-area"]}>
          <TextField value={newTaskValue} onChange={handleChangeInput} />
          <Button
            title="Add Task"
            onClick={addTask}
            variant="filled"
            disabled={newTaskValue.length === 0 ? true : false}
          />
        </div>
      </div>
    </section>
  );
};
