
import { createContext, useContext, useEffect, useState } from "react";

import {
  getTickets,
  createTicket,
  updateTickets,
  deleteTicket,
} from "../api/ticketApi";

const TicketContext = createContext();

export function TicketProvider({ children }) {

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      setError("");
      const data = await getTickets();
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Add ticket
  const addTicket = async (ticketData) => {
    const newTicket = await createTicket(ticketData);

    setTickets((prev) => [...prev, newTicket]);

    return newTicket;
  };

  // Edit ticket
  const editTicket = async (id, updates) => {
    const updatedTicket = await updateTickets(id, updates);

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? updatedTicket : ticket
      )
    );

    return updatedTicket;
  };

  // Remove ticket
  const removeTicket = async (id) => {
    await deleteTicket(id);

    setTickets((prev) =>
      prev.filter((ticket) => ticket.id !== id)
    );
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        error,
        addTicket,
        editTicket,
        removeTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketContext);
}
