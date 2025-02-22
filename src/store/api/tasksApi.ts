import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Itask } from "../../types/tasks.types";

export const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<Itask[], void>({
      query: () => "tasks",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Tasks" as const,
                id,
              })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
    addTask: builder.mutation({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    getTaskById: builder.query<Itask, string>({
      query: (id: string) => ({
        url: `tasks/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    updateTask: builder.mutation({
      query: (patchedTask: Itask) => ({
        url: `tasks/${patchedTask.id}`,
        method: "PUT",
        body: patchedTask,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Tasks", id: arg.id },
        { type: "Tasks", id: "LIST" },
      ],
    }),
    deleteTask: builder.mutation({
      query: (taskId: string) => ({
        url: `tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
} = tasksApi;
