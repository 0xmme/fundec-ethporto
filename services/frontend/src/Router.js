import { Routes, Route, Outlet } from "react-router-dom";

/* Auth */
import Landing from "pages/Landing";

/* Campaigns */
import ListCampaigns from "pages/Campaigns/List";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        {/************** Public routes ***************/}
        <Route index element={<Landing />} />
        {/************** Protected Routes ***************/}
        <Route path="open-campaigns" element={<ListCampaigns />} />
      </Route>
    </Routes>
  );
}
