import { useGetTasksQuery } from "../../store/api/tasksApi";
import Task from "../Task/Task";

const TasksList = () => {
  const { data = [], isLoading } = useGetTasksQuery();
  console.log("tasklist");

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <ul style={{ padding: "0" }}>
          {data.map((el) => (
            <Task
              key={el.id}
              title={el.title}
              id={el.id}
              status={el.status}
              isEdit={el.isEdit}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default TasksList;
