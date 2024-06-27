import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Form, Table } from "react-bootstrap";
import { UseAuth } from "../store/auth";

const Admin_GrainData = () => {
  const { grain } = UseAuth();
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    price: ''
  });
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('category', formData.category);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    if (file) {
      data.append('image', file);
    }
  
    if (editing) {
      axios.put(`http://localhost:3000/api/admin/grains/update/${currentId}`, data)
        .then(response => {
          alert('grain updated successfully!');
          setEditing(false);
          setCurrentId(null);
        })
        .catch(err => console.error('Error updating grain:', err));
    } else {
      axios.post('http://localhost:3000/api/admin/grains/add', data)
        .then(response => {
          alert('grain added successfully!');
        })
        .catch(err => console.error('Error adding grain:', err));
    }
  
    setFormData({
      category: '',
      title: '',
      description: '',
      price: ''
    });
    setFile(null);
  };

  const handleEdit = (grain) => {
    setFormData({
      category: grain.category,
      title: grain.title,
      description: grain.description,
      price: grain.price
    });
    setFile(null);
    setEditing(true);
    setCurrentId(grain._id);
  };

  return (
    <div>
      <div className="AdminUsersSection">
        <h3>grain Data</h3>
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
            {grain.map((grain) => (
              <tr key={grain._id}>
                <td>{grain.title}</td>
                <td>{grain.description}</td>
                <td>{grain.price}</td>
                <td>
                  <img
                    src={`http://localhost:3000/${grain.imgSrc}`}
                    alt={grain.title}
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <Button onClick={() => handleEdit(grain)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="file" name="image" onChange={handleFileChange} required={!editing} />
        <button type="submit">{editing ? 'Update grain' : 'Add grain'}</button>
      </form>
    </div>
  );
};

export default Admin_GrainData;
