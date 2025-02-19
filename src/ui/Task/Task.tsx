import clsx from "clsx";
import React, { DetailedHTMLProps, FC, HTMLAttributes, useState } from "react";
import styles from "./Task.module.scss";

import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import { DeleteIcon, EditIcon, SaveIcon } from "../../assets";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../store/tasksApi";

interface ITask
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  title: string;
  status: boolean;
  id: string;
  isEdit: boolean;
}

const Task: FC<ITask> = ({ title, status, id, isEdit, ...props }) => {
  const [newValue, setNewValue] = useState(title);
  const [patchTask] = useUpdateTaskMutation();
  const [removeTask] = useDeleteTaskMutation();

  const deleteTask = async () => {
    await removeTask(id);
  };

  const handleChangeNewValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };

  const saveTaskChanges = async () => {
    try {
      await patchTask({
        id,
        status,
        isEdit: false,
        title: newValue,
      }).unwrap();
    } catch (error) {
      alert(`Error:${error}`);
    }
  };

  const toggleEditTaskStatus = async () => {
    try {
      await patchTask({ id, status, isEdit: !isEdit, title }).unwrap();
    } catch (error) {
      alert(`Error:${error}`);
    }
  };
  const toggleTaskStatus = async () => {
    try {
      await patchTask({ id, status: !status, isEdit, title }).unwrap();
    } catch (error) {
      alert(`Error:${error}`);
    }
  };

  return (
    <li style={props} className={clsx(styles.task)}>
      {isEdit ? (
        <TextField value={newValue} onChange={handleChangeNewValue} />
      ) : (
        <p
          className={clsx(styles.title, { [styles["task-done"]]: status })}
          onClick={toggleTaskStatus}
        >
          {title}
        </p>
      )}
      <div className={clsx(styles["button-container"])}>
        {isEdit ? (
          <Button
            icon={<SaveIcon size="md" color="#0BDFAC" />}
            onClick={saveTaskChanges}
          />
        ) : (
          <Button
            icon={<EditIcon size="md" />}
            onClick={toggleEditTaskStatus}
          />
        )}
        <Button
          icon={<DeleteIcon size="md" color="#C04476" />}
          onClick={deleteTask}
        />
      </div>
    </li>
  );
};

const MemoizedTask = React.memo(Task, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.isEdit === nextProps.isEdit &&
    prevProps.status === nextProps.status
  );
});

export default MemoizedTask;
