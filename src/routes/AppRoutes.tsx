import { Route, Routes } from "react-router-dom";
import { Layout, ToDo } from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ToDo />} />
      </Route>
    </Routes>
  );
};
