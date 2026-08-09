import { useEffect, useState } from "react";
import API from "../services/api";
import AddClientModal from "../components/AddClientModal";
import "../styles/clients.css";

function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await API.get("/clients");
      setClients(res.data.clients || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleDelete = async (clientId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await API.delete(`/clients/${clientId}`);
        fetchClients();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete client");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
  };

  const filteredClients = clients.filter((client) =>
    client.name?.toLowerCase().includes(search.toLowerCase()) ||
    client.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="clients-page">
      <div className="clients-top">
        <h1>My Clients</h1>

        <button
          className="add-btn"
          onClick={() => {
            setEditingClient(null);
            setShowModal(true);
          }}
        >
          + Add Client
        </button>
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="Search client..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="clients-grid">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <div className="client-card" key={client._id}>
              <div className="avatar">
                {client.name?.charAt(0).toUpperCase()}
              </div>

              <h3>{client.name}</h3>
              <p>{client.email}</p>
              <span>{client.phone}</span>

              <div className="buttons">
                <button onClick={() => handleEdit(client)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(client._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3>No Clients Found</h3>
        )}
      </div>

      {showModal && (
        <AddClientModal
          closeModal={handleCloseModal}
          refreshClients={fetchClients}
          clientToEdit={editingClient}
        />
      )}
    </div>
  );
}

export default Clients;