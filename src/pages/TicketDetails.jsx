
import { useNavigate, useParams } from "react-router-dom";

import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";

function TicketDetails({ tickets = [], onDelete, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const ticket = tickets.find(
    (item) => String(item.id) === String(id)
  );

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (!ticket) {
    return (
      <div className="not-found">
        <h2>Ticket Not Found</h2>
        <p>The ticket you're looking for doesn't exist.</p>

        <button onClick={() => navigate("/tickets")}>
          Back to Tickets
        </button>
      </div>
    );
  }

  // DELETE ticket
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) return;

    try {
      await onDelete(ticket.id);
      navigate("/tickets");
    } catch (error) {
      alert(error.message || "Failed to delete ticket.");
    }
  };

  // EDIT ticket
  const handleEdit = async () => {
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
    <div className="page-content detail-page">

      <button
        className="back-button"
        onClick={() => navigate("/tickets")}
      >
        ← Back to tickets
      </button>

      <div className="detail-header">
        <div>
          <h1>{ticket.title}</h1>

          <p>
            Ticket #{ticket.id} · Created{" "}
            {formatDate(ticket.created_at)}
          </p>
        </div>

        <div className="detail-actions">
          <button
            className="primary-button"
            onClick={handleEdit}
          >
            Edit Ticket
          </button>

          <button
            className="danger-button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="detail-badges">
        <PriorityBadge priority={ticket.priority || "Low"} />
        <StatusBadge status={ticket.status || "Open"} />
      </div>

      <div className="detail-grid">

        <div className="detail-card description-card">
          <h3>Description</h3>

          <p className="description-text">
            {ticket.description || "No description provided."}
          </p>

          {ticket.expected_result && (
            <div className="expected-result">
              <h4>What should happen?</h4>
              <p>{ticket.expected_result}</p>
            </div>
          )}
        </div>

        <div className="detail-card information-card">
          <h3>Ticket Information</h3>

          <div className="info-row">
            <span>Ticket ID</span>
            <strong>#{ticket.id}</strong>
          </div>

          <div className="info-row">
            <span>Priority</span>
            <strong>{ticket.priority || "Low"}</strong>
          </div>

          <div className="info-row">
            <span>Status</span>
            <strong>{ticket.status || "Open"}</strong>
          </div>

          <div className="info-row">
            <span>Created at</span>
            <strong>{formatDate(ticket.created_at)}</strong>
          </div>

          <div className="info-row">
            <span>Updated at</span>
            <strong>{formatDate(ticket.updated_at)}</strong>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TicketDetails;
