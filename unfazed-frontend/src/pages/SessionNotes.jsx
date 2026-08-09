import { useEffect, useState } from "react";
import API from "../services/api";
import AddSessionNoteModal from "../components/AddSessionNoteModal";
import "../styles/sessionNotes.css";

function SessionNotes() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/session-notes");
      setNotes(res.data.notes || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="notes-page">

      <div className="notes-header">
        <h1>Session Notes</h1>

        <button className="add-note-btn" onClick={() => setShowModal(true)}>
          + New Note
        </button>
      </div>

      <div className="notes-grid">

        {notes.length > 0 ? (

          notes.map((note) => (

            <div className="note-card" key={note._id}>

              <h3>{note.title}</h3>

              <p>
                <strong>Client:</strong> {note.client?.name || "Client"}
              </p>

              <p>{note.notes}</p>

              <span className="mood">
                Mood: {note.mood}
              </span>

              {note.nextSessionDate && (
                <small style={{ display: "block", marginTop: "8px", color: "#666" }}>
                  📅 Next: {note.nextSessionDate}
                </small>
              )}

            </div>

          ))

        ) : (

          <h3>No Notes Found</h3>

        )}

      </div>

      {showModal && (
        <AddSessionNoteModal
          closeModal={() => setShowModal(false)}
          refreshNotes={fetchNotes}
        />
      )}

    </div>
  );
}

export default SessionNotes;