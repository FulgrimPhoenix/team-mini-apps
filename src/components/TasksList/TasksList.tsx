import { useGetTasksQuery } from "../../store/api/tasksApi";
import { MemoizedTask } from "../../ui";

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
            <MemoizedTask
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
