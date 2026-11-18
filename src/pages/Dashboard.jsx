
import { useNavigate } from "react-router-dom";

import StatCard from "../components/StatCard";
import TicketTable from "../components/TicketTable";

function Dashboard({ tickets = [] }) {
  const navigate = useNavigate();

  // Calculate ticket summary
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  // Get latest 5 tickets
  const recentTickets = [...tickets]
    .sort((a, b) => {
      return (
        new Date(b.created_at) - new Date(a.created_at)
      );
    })
    .slice(0, 5);

  return (
    <div className="dashboard">

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1>Ticket Management</h1>
          <p>Manage and track all support requests.</p>
        </div>

        <button onClick={() => navigate("/tickets")}>
          View All Tickets
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-container">

        <StatCard
          title="Total Tickets"
          count={totalTickets}
          color="blue"
        />

        <StatCard
          title="Open"
          count={openTickets}
          color="green"
        />

        <StatCard
          title="In Progress"
          count={inProgressTickets}
          color="orange"
        />

        <StatCard
          title="Resolved"
          count={resolvedTickets}
          color="purple"
        />

      </div>

      {/* Recent Tickets Section */}
      <div className="recent-tickets">

        <div className="section-header">
          <div>
            <h2>Recent Tickets</h2>
            <p>Latest support requests</p>
          </div>

          <button onClick={() => navigate("/tickets")}>
            View All
          </button>
        </div>

        {recentTickets.length > 0 ? (
          <TicketTable
            tickets={recentTickets}
            onViewTicket={(id) =>
              navigate(`/tickets/${id}`)
            }
          />
        ) : (
          <div className="empty-state">
            <h3>No Tickets Found</h3>
            <p>
              There are currently no tickets in the database.
            </p>

            <button onClick={() => navigate("/create")}>
              Create Your First Ticket
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;
