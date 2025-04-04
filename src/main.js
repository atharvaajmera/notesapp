import { AiOutlineDelete } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import React from "react";

export default function AppMain() {
  
  const [text, setText] = useState({ head: "", material: "" });
  const [divs, setDivs] = useState(() => JSON.parse(localStorage.getItem("divs")) || []);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("divs", JSON.stringify(divs));
  }, [divs]);

  function handleHeadChange(e) {
    setText((prevText) => ({ ...prevText, head: e.target.value }));
  }

  function handleMaterialChange(e) {
    setText((prevText) => ({ ...prevText, material: e.target.value }));
  }

  const addDiv = () => {
    if (text.head.trim() || text.material.trim()) {
      setDivs([...divs, { head: text.head, material: text.material }]);
      setText({ head: "", material: "" });
    }
  };

  const deleteDiv = (index) => {
    const updatedDivs = divs.filter((_, i) => i !== index);
    setDivs(updatedDivs);
    localStorage.setItem("divs", JSON.stringify(updatedDivs));
  };

  const editDiv = (index) => {
    setEditIndex(index);
  };

  const handleEditChange = (index, field, value) => {
    const updatedDivs = [...divs];
    updatedDivs[index][field] = value;
    setDivs(updatedDivs);
  };

  const saveEdit = () => {
    setEditIndex(null);
    localStorage.setItem("divs", JSON.stringify(divs));
  };

  const clearAllNotes = () => {
    setDivs([]);
    localStorage.removeItem("divs");
  };

  return (
    <div>
      <div className="noteadder">
        <textarea
          value={text.head}
          onChange={handleHeadChange}
          placeholder="Title"
          className="titlefield"
          rows="3"
          style={{ width: "100%", resize: "none" }}
        />
        <br />
        <textarea
          value={text.material}
          onChange={handleMaterialChange}
          placeholder="Take a Note..."
          className="materialfield"
          rows="3"
          style={{ width: "100%", resize: "none" }}
        />
        <div className="icon-container">
          <CiCirclePlus className="adder" onClick={addDiv} />
        </div>
      </div>
      <h2>Your Notes-</h2>
      <div className="grid-container">
        {divs.map((note, index) => (
          <div
            key={index}
            className="tiles"
            style={{
              padding: "10px",
              margin: "10px 0",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
            }}
          >
            {editIndex === index ? (
              <>
                <textarea
                  value={note.head}
                  onChange={(e) => handleEditChange(index, "head", e.target.value)}
                  onBlur={saveEdit}
                  className="edit-field"
                  rows="1"
                  style={{ width: "100%", resize: "none", fontWeight: "bold" }}
                />
                <textarea
                  value={note.material}
                  onChange={(e) => handleEditChange(index, "material", e.target.value)}
                  onBlur={saveEdit}
                  className="edit-field"
                  rows="3"
                  style={{ width: "100%", resize: "none" }}
                />
              </>
            ) : (
              <>
                <strong>{note.head}</strong>
                <p>{note.material}</p>
                <FaEdit onClick={() => editDiv(index)} />
                <AiOutlineDelete onClick={() => deleteDiv(index)} />
              </>
            )}
          </div>
        ))}
      </div>

      <div className="delete">
        <button onClick={clearAllNotes} className="deletebtn">
          Clear All Notes
        </button>
      </div>
    </div>
  );
}

