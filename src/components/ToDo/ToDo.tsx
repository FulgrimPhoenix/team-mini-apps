import clsx from "clsx";
import styles from "./ToDo.module.scss";
import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Button, MemoizedTask, TextField } from "../../ui";
import { useAddTaskMutation, useGetTasksQuery } from "../../store/tasksApi";
import { Itask } from "../../types/tasks.types";

export const ToDo: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = () => {
  const [newTaskValue, setNewTaskValue] = useState("");
  const [tasksArray, setTasksArray] = useState<Itask[]>([]);
  const { data = [], isLoading } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();

  const handleAddTask = async () => {
    const taskId = Date.now();

    if (newTaskValue) {
      await addTask({
        id: `${taskId}`,
        title: newTaskValue,
        status: false,
        isEdit: false,
      }).unwrap();
    }
    setNewTaskValue("");
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskValue(e.target.value);
  };

  useEffect(() => {
    setNewTaskValue("");
  }, [tasksArray]);

  useEffect(() => {
    if (!isLoading) {
      if (Array.isArray(data)) {
        setTasksArray(data);
      }
    }
  }, [data, isLoading]);

  return (
    <section className={clsx(styles.toDo)}>
      <div className={clsx(styles.container)}>
        <h2 className={clsx(styles.title)}>To Do List!</h2>
        <h3 className={clsx(styles.subtitle)}>A Sample React Todo list App</h3>
        <ul style={{ padding: "0" }}>
          {tasksArray.length > 0 ? (
            tasksArray.map((el) => {
              return (
                <MemoizedTask
                  key={el.id}
                  title={el.title}
                  id={el.id}
                  status={el.status}
                  isEdit={el.isEdit}
                />
              );
            })
          ) : (
            <span>No tasks</span>
          )}
        </ul>
        <div className={styles["input-area"]}>
          <TextField value={newTaskValue} onChange={handleChangeInput} />
          <Button
            title="Add Task"
            onClick={handleAddTask}
            variant="filled"
            disabled={newTaskValue.length === 0 ? true : false}
          />
        </div>
      </div>
    </section>
  );
};
