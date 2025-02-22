import { useState } from "react";
import { Button, TextField } from "../../ui";
import styles from "./InputField.module.scss";
import { useAddTaskMutation } from "../../store/api/tasksApi";

const InputField = () => {
  const [newTaskValue, setNewTaskValue] = useState("");
  const [addTask] = useAddTaskMutation();

  const handleChangeNewTaskValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskValue(e.target.value);
  };

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

  return (
    <div className={styles.inputField}>
      <TextField value={newTaskValue} onChange={handleChangeNewTaskValue} />
      <Button
        title="Add Task"
        onClick={handleAddTask}
        variant="filled"
        disabled={newTaskValue.length === 0 ? true : false}
      />
    </div>
  );
};

export default InputField;
