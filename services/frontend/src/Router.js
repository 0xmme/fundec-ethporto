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
        <Route path="signin" element={<Landing activeStepProp={1} />} />
        <Route index element={<Landing activeStepProp={0} />} />
        {/************** Protected Routes ***************/}
        <Route path="open-campaigns" element={<ListCampaigns />} />
      </Route>
    </Routes>
  );
}
