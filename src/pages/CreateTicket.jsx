
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function CreateTicket({ onCreateTicket }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await onCreateTicket({
        title: title.trim(),
        description: description.trim(),
      });

      setTitle("");
      setDescription("");

      navigate("/tickets");
    } catch (err) {
      console.error("Create ticket error:", err);
      setError(err.message || "Failed to create ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <PageHeader
        title="Create Ticket"
        subtitle="Submit a new support request."
      />

      <form className="ticket-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Ticket Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter ticket title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Describe your issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}

export default CreateTicket;
