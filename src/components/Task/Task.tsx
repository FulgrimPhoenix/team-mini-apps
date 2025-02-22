import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useCallback,
} from "react";
import styles from "./Task.module.scss";

import Button from "../../ui/Button/Button";
import { DeleteIcon, EditIcon, SaveIcon } from "../../assets";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../store/api/tasksApi";
import { TaskTitle } from "../../ui";

interface ITask
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  title: string;
  status: boolean;
  id: string;
  isEdit: boolean;
}

const Task: FC<ITask> = React.memo(
  ({ title, status, id, isEdit, ...props }) => {
    const [patchTask] = useUpdateTaskMutation();
    const [removeTask] = useDeleteTaskMutation();

    const deleteTask = useCallback(async () => {
      await removeTask(id);
    }, [id]);

    const toggleEditTaskStatus = useCallback(async () => {
      try {
        await patchTask({ id, status, isEdit: !isEdit, title }).unwrap();
      } catch (error) {
        alert(`Error:${error}`);
      }
    }, [id]);

    const toggleTaskStatus = async () => {
      try {
        await patchTask({ id, status: !status, isEdit, title }).unwrap();
      } catch (error) {
        alert(`Error:${error}`);
      }
    };

    console.log(id);

    return (
      <li style={props} className={clsx(styles.task)}>
        <div className={clsx(styles["button-container"])}>
          <TaskTitle id={id} />
          {isEdit ? (
            <Button icon={<SaveIcon size="md" color="#0BDFAC" />} />
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
  },
  (prev, next) => {
    return (
      prev.title === next.title &&
      prev.isEdit === next.isEdit &&
      prev.status === next.status
    );
  }
);

export default Task;
