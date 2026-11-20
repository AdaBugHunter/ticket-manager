
import { useState } from "react";

import PageHeader from "../components/PageHeader";
import TicketTable from "../components/TicketTable";

function Tickets({ tickets = [], onDelete, onEdit }) {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");


  // Search and filter tickets
  const filteredTickets = tickets.filter((ticket) => {

    const matchesSearch = ticket.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "All" ||
      ticket.status === status;

    const matchesPriority =
      priority === "All" ||
      ticket.priority === priority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );

  });


  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
  };


  return (
    <div className="page-content">

      {/* Page Header */}
      <PageHeader
        title="All Tickets"
        subtitle="Manage, search and track all support tickets."
      />


      {/* Search and Filters */}
      <div className="ticket-filters">

        {/* Search */}
        <input
          type="text"
          placeholder="Search tickets by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >

          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>

        </select>


        {/* Priority Filter */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >

          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>

        </select>


        {/* Clear Filters */}
        <button
          className="clear-filter"
          onClick={clearFilters}
        >
          Clear
        </button>

      </div>


      {/* Tickets Table */}
      <div className="tickets-card">

        <div className="table-heading">

          <h2>Tickets</h2>

          <span>
            {filteredTickets.length} tickets found
          </span>

        </div>


        <TicketTable
          tickets={filteredTickets}
          onDelete={onDelete}
          onEdit={onEdit}
        />

      </div>

    </div>
  );
}

export default Tickets;
