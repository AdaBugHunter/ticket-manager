const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL;

const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const ticketsUrl =
  `${supabaseUrl}/rest/v1/tickets`;

const headers = {
  apikey: supabaseKey,
  'Content-Type': 'application/json',
};

//GET
export const getTickets = async () => {
  const response = await fetch(
    `${ticketsUrl}?select=*`,
    {
      method: 'GET',
      headers,
    }
  );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch tickets'
    );
  }

  const data = await response.json();

  return data;
};

//POST
export const createTicket = async (ticketsData) => {
  const response = await fetch(
    ticketsUrl,
    {
      method: 'POST',

      headers: {
        ...headers,
        Prefer: 'return=representation',
      },

      body: JSON.stringify(ticketsData),
    }
  );

  if (!response.ok) {
    throw new Error(
      'Failed to create ticket'
    );
  }

  const data = await response.json();

  return data[0];
};

//PATCH
export const updateTickets = async (id,updates) => {
  if (
    !updates ||
    Object.keys(updates).length === 0) 
    { 
    throw new Error(
      'No ticket updates provided'
    );
}

  const response = await fetch(
    `${ticketsUrl}?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        ...headers,
        Prefer: 'return=representation',
      },
      body: JSON.stringify(updates),
    }
  );

  if (!response.ok) {
    throw new Error(
      'Failed to update ticket'
    );
  }
  
  const data = await response.json();
  return data[0];
};

//DELETE
export const deleteTicket = async (id) => {
  const response = await fetch(
    `${ticketsUrl}?id=eq.${id}`,
    {
      method: 'DELETE',
      headers,
    }
  );

  if (!response.ok) {
    throw new Error(
      'Failed to delete ticket'
    );
  }

  return true;
};