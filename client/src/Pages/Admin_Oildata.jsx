import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";
import { UseAuth } from "../store/auth";

const Admin_Oildata = () => {
  const { oil } = UseAuth();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    if (file) {
      data.append("image", file);
    }

    if (editing) {
      axios
        .put(`http://localhost:3000/api/admin/oils/update/${currentId}`, data)
        .then((response) => {
          alert("Oil updated successfully!");
          setEditing(false);
          setCurrentId(null);
        })
        .catch((err) => console.error("Error updating oil:", err));
    } else {
      axios
        .post("http://localhost:3000/api/admin/oils/add", data)
        .then((response) => {
          alert("Oil added successfully!");
        })
        .catch((err) => console.error("Error adding oil:", err));
    }

    setFormData({
      category: "",
      title: "",
      description: "",
      price: "",
    });
    setFile(null);
  };

  const handleEdit = (oil) => {
    setFormData({
      category: oil.category,
      title: oil.title,
      description: oil.description,
      price: oil.price,
    });
    setFile(null);
    setEditing(true);
    setCurrentId(oil._id);
  };

  return (
    <div>
      <div className="AdminUsersSection">
        <h3>Fruit Data</h3>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {oil.map((oil) => (
              <tr key={oil._id}>
                <td>{oil.title}</td>
                <td>{oil.description}</td>
                <td>{oil.price}</td>
                <td>
                  <img
                    src={`http://localhost:3000/${oil.imgSrc}`}
                    alt={oil.title}
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <Button onClick={() => handleEdit(oil)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
          j
        </Table>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          required={!editing}
        />
        <button type="submit">{editing ? "Update Oil" : "Add Oil"}</button>
      </form>
    </div>
  );
};

export default Admin_Oildata;
