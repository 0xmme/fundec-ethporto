import { Routes, Route, Outlet } from "react-router-dom";

/* Auth */
import Landing from "pages/Landing";

/* Communities */
import ListCommunities from "pages/Communities/List";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/************** Public routes ***************/}
        <Route index element={<Landing />} />
        {/************** Protected Routes ***************/}
        <Route path="open-communities" element={<ListCommunities />} />
      </Route>
    </Routes>
  );
}
