
import { useEffect, useState } from "react";

import {
  getTickets,
  createTicket,
  updateTickets,
  deleteTicket,
} from "./api/ticketApi";

import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTickets();

      setTickets(data);
    } catch (err) {
      console.error("Fetch tickets error:", err);

      setError(
        "Unable to load tickets. Please check your internet connection or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Create ticket
  const handleCreateTicket = async (ticketData) => {
    const newTicket = await createTicket(ticketData);

    setTickets((previousTickets) => [
      newTicket,
      ...previousTickets,
    ]);

    return newTicket;
  };

  // Update ticket
  const handleUpdateTicket = async (id, updates) => {
    const updatedTicket = await updateTickets(id, updates);

    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        String(ticket.id) === String(id)
          ? updatedTicket
          : ticket
      )
    );

    return updatedTicket;
  };

  // Delete ticket
  const handleDeleteTicket = async (id) => {
    await deleteTicket(id);

    setTickets((previousTickets) =>
      previousTickets.filter(
        (ticket) => String(ticket.id) !== String(id)
      )
    );
  };

  return (
    <>
      {/* Loading message */}
      {loading && (
        <div className="app-notice">
          Loading tickets...
        </div>
      )}

      {/* Error message */}
      {!loading && error && (
        <div className="app-error">
          <p>{error}</p>

          <button onClick={fetchTickets}>
            Try Again
          </button>
        </div>
      )}

      {/* Application always renders */}
      <AppRoutes
        tickets={tickets}
        onCreateTicket={handleCreateTicket}
        onUpdateTicket={handleUpdateTicket}
        onDeleteTicket={handleDeleteTicket}
      />
    </>
  );
}

export default App;
