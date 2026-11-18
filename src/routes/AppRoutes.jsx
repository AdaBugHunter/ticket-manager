
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/Layout";

import Dashboard from "../pages/Dashboard";
import Tickets from "../pages/Tickets";
import CreateTicket from "../pages/CreateTicket";
import TicketDetails from "../pages/TicketDetails";

function AppRoutes({
  tickets,
  onCreateTicket,
  onUpdateTicket,
  onDeleteTicket
}) {
  return (
    <Routes>
      <Route element={<Layout />}>
        
        <Route
          path="/"
          element={<Dashboard tickets={tickets} />}
        />

        <Route
          path="/tickets"
          element={
            <Tickets
              tickets={tickets}
              onDelete={onDeleteTicket}
              onEdit={onUpdateTicket}
            />
          }
        />

        <Route
          path="/create"
          element={
            <CreateTicket
              onCreateTicket={onCreateTicket}
            />
          }
        />

        <Route
          path="/tickets/:id"
          element={
            <TicketDetails
              tickets={tickets}
              onDelete={onDeleteTicket}
              onEdit={onUpdateTicket}
            />
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Route>
    </Routes>
  );
}

export default AppRoutes;
