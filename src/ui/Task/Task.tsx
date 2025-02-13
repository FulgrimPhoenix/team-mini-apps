import clsx from "clsx";
import {
  DetailedHTMLProps,
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useState,
} from "react";
import styles from "./Task.module.scss";
import { Button } from "../Button/Button";
import { DeleteIcon } from "../../assets/DeleteIcon";
import { EditIcon } from "../../assets/EditIcon";
import { SaveIcon } from "../../assets/SaveIcon";
import { TextField } from "../TextField/TextField";
import { Itask } from "../../components/ToDo/ToDo";

interface ITask
  extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  title: string;
  status: boolean;
  id: string;
  isEdit: boolean;
  setTasks: Dispatch<SetStateAction<Itask>>;
}

export const Task: FC<ITask> = ({
  title,
  status,
  id,
  isEdit,
  setTasks,
  ...props
}) => {
  const [newValue, setNewValue] = useState(title);

  const deleteTask = () => {
    setTasks((prev: Itask) => {
      const newTasks = { ...prev };
      delete newTasks[id];
      return newTasks;
    });
  };

  const handleChangeNewValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };

  const saveTaskChanges = () => {
    setTasks((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        title: newValue,
        isEdit: false,
      },
    }));
  };

  const toggleEditTaskStatus = () => {
    setTasks((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isEdit: !prev[id].isEdit,
      },
    }));
  };
  const toggleTaskStatus = () => {
    setTasks((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status: !prev[id].status,
      },
    }));
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
