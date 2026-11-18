
import { useEffect, useState } from "react";

import {
  getTickets,
  createTicket,
  updateTickets,
  deleteTicket
} from "./api/ticketApi";

import AppRoutes from "./routes/AppRoutes";

import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET: Fetch all tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // POST: Create ticket
  const handleCreateTicket = async (ticketData) => {
    const newTicket = await createTicket(ticketData);

    setTickets((previousTickets) => [
      newTicket,
      ...previousTickets
    ]);

    return newTicket;
  };

  // PATCH: Update ticket
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

  // DELETE: Delete ticket
  const handleDeleteTicket = async (id) => {
    await deleteTicket(id);

    setTickets((previousTickets) =>
      previousTickets.filter(
        (ticket) => String(ticket.id) !== String(id)
      )
    );
  };

  if (loading) {
    return <h2>Loading tickets...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <AppRoutes
      tickets={tickets}
      onCreateTicket={handleCreateTicket}
      onUpdateTicket={handleUpdateTicket}
      onDeleteTicket={handleDeleteTicket}
    />
  );
}

export default App;
