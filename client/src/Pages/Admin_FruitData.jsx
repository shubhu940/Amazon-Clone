import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Form, Table } from "react-bootstrap";
import { UseAuth } from "../store/auth";

const AdminFruitData = () => {
  const { fruit } = UseAuth();
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
      axios.put(`http://localhost:3000/api/admin/fruits/update/${currentId}`, data)
        .then(response => {
          alert('Fruit updated successfully!');
          setEditing(false);
          setCurrentId(null);
        })
        .catch(err => console.error('Error updating fruit:', err));
    } else {
      axios.post('http://localhost:3000/api/admin/fruits/add', data)
        .then(response => {
          alert('Fruit added successfully!');
        })
        .catch(err => console.error('Error adding fruit:', err));
    }
  
    setFormData({
      category: '',
      title: '',
      description: '',
      price: ''
    });
    setFile(null);
  };

  const handleEdit = (fruit) => {
    setFormData({
      category: fruit.category,
      title: fruit.title,
      description: fruit.description,
      price: fruit.price
    });
    setFile(null);
    setEditing(true);
    setCurrentId(fruit._id);
  };
  const deleteFruit = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/fruits/delete/${id}`,
        {
          method: "DELETE",
          
        }
      );
      if (response.ok) {
        alert("frit deleted");
      } else {
        console.error("Failed to delete user");
        
      }
    } catch (error) {
      console.error(error);
   
    }
  };

  useEffect(() => {
    deleteFruit();
  }, []);

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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {fruit.map((fruit) => (
              <tr key={fruit._id}>
                <td>{fruit.title}</td>
                <td>{fruit.description}</td>
                <td>{fruit.price}</td>
                <td>
                  <img
                    src={`http://localhost:3000/${fruit.imgSrc}`}
                    alt={fruit.title}
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <Button onClick={() => handleEdit(fruit)}>Edit</Button>
                </td>
                <td>
                <Button
                    onClick={() => deleteFruit(fruit._id)}
                  >
                    delete
                    </Button>
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
        <button type="submit">{editing ? 'Update Fruit' : 'Add Fruit'}</button>
      </form>
    </div>
  );
};

export default AdminFruitData;
