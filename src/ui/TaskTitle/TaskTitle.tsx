import React, { DetailedHTMLProps, FC, HTMLAttributes, useState } from "react";
import TextField from "../TextField/TextField";
import clsx from "clsx";
import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "../../store/api/tasksApi";
import styles from "./TaskTitle.module.scss";

interface ITaskTitle
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  id: string;
}

const TaskTitle: FC<ITaskTitle> = React.memo(({ id, ...props }) => {
  const { data, isLoading } = useGetTaskByIdQuery(id);
  const [patchTask] = useUpdateTaskMutation();
  const [newValue, setNewValue] = useState("");

  const handleChangeNewValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };

  const handleBlur = () => {
    if (data && newValue !== data.title) {
      patchTask({ ...data, title: newValue }).unwrap();
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Task not found</p>;

  return (
    <>
      {data.isEdit ? (
        <TextField
          value={data.title}
          onChange={handleChangeNewValue}
          onBlur={handleBlur}
        />
      ) : (
        <p
          className={clsx(styles.taskTitle, {
            [styles["taskTitleDone"]]: data.status,
          })}
          {...props}
        >
          {data.title}
        </p>
      )}
    </>
  );
});

export default TaskTitle;
