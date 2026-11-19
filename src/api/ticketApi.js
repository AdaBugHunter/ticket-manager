
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const ticketsUrl = `${supabaseUrl}/rest/v1/tickets`;

const headers = {
  apikey: supabaseKey,
  "Content-Type": "application/json",
};

// Reusable error handler
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    console.error("Supabase API Error:", errorData);

    throw new Error(
      errorData?.message ||
      errorData?.details ||
      `Request failed with status ${response.status}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// GET
export const getTickets = async () => {
  const response = await fetch(
    `${ticketsUrl}?select=*`,
    {
      method: "GET",
      headers,
    }
  );

  return handleResponse(response);
};

// POST
export const createTicket = async (ticketData) => {
  const response = await fetch(ticketsUrl, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "return=representation",
    },
    body: JSON.stringify(ticketData),
  });

  const data = await handleResponse(response);

  return data?.[0];
};

// PATCH
export const updateTickets = async (id, updates) => {
  if (!updates || Object.keys(updates).length === 0) {
    throw new Error("No ticket updates provided");
  }

  const response = await fetch(
    `${ticketsUrl}?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
      body: JSON.stringify(updates),
    }
  );

  const data = await handleResponse(response);

  if (!data?.[0]) {
    throw new Error("Ticket was not updated or could not be returned.");
  }

  return data[0];
};

// DELETE
export const deleteTicket = async (id) => {
  const response = await fetch(
    `${ticketsUrl}?id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers,
    }
  );

  await handleResponse(response);

  return true;
};
console.log("Supabase URL:", supabaseUrl);
console.log("Tickets URL:", ticketsUrl);