
import { useNavigate } from "react-router-dom";

import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function TicketTable({ tickets = [], onDelete, onEdit }) {
  const navigate = useNavigate();

  // Format date
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Delete ticket
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) return;

    try {
      await onDelete(id);
    } catch (error) {
      alert(error.message || "Failed to delete ticket.");
    }
  };

  // Edit ticket
  const handleEdit = async (ticket) => {
    const newTitle = window.prompt(
      "Enter ticket title:",
      ticket.title
    );

    if (newTitle === null) return;

    const newDescription = window.prompt(
      "Enter ticket description:",
      ticket.description || ""
    );

    if (newDescription === null) return;

    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }

    try {
      await onEdit(ticket.id, {
        title: newTitle.trim(),
        description: newDescription.trim(),
      });

      alert("Ticket updated successfully.");
    } catch (error) {
      alert(error.message || "Failed to update ticket.");
    }
  };

  return (
    <div className="table-wrapper">
      <table className="ticket-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-message">
                No tickets found.
              </td>
            </tr>
          ) : (
            tickets.map((ticket, index) => (
              <tr key={ticket.id}>

                <td>{index + 1}</td>

                <td className="ticket-title">
                  {ticket.title}
                </td>

                <td>
                  <PriorityBadge
                    priority={ticket.priority || "Low"}
                  />
                </td>

                <td>
                  <StatusBadge
                    status={ticket.status || "Open"}
                  />
                </td>

                <td>{formatDate(ticket.created_at)}</td>

                <td>
                  <div className="table-actions">

                    <button
                      className="view-action"
                      onClick={() =>
                        navigate(`/tickets/${ticket.id}`)
                      }
                    >
                      View
                    </button>

                    {onEdit && (
                      <button
                        className="edit-action"
                        onClick={() => handleEdit(ticket)}
                      >
                        Edit
                      </button>
                    )}

                    {onDelete && (
                      <button
                        className="delete-action"
                        onClick={() => handleDelete(ticket.id)}
                      >
                        ×
                      </button>
                    )}

                  </div>
                </td>

              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}

export default TicketTable;
