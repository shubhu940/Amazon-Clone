import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './tform.css'

const TrialForm = () => {
    const [pname, setPname] = useState('');
    const [pprice, setPprice] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [pdisc, setPdisc] = useState('');
    const [pimg, setPimg] = useState(); // Initialize with null for file input
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('pname', pname);
            formData.append('pprice', pprice);
            formData.append('pdesc', pdesc);
            formData.append('pdisc', pdisc);
            formData.append('pimg', pimg);

            const response = await axios.post('http://localhost:3000/tform', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate('/plist');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    

    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setPimg(e.target.files[0]); 
    };

    return (
        <div className='ocontainer'>
            <h2>Product Details</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>ProductName:</label>
                    <input type="text" value={pname} onChange={(e) => setPname(e.target.value)} />
                </div>
                <div className='fprice'>
                    <label>Price:</label>
                    <input type="number" value={pprice} onChange={(e) => setPprice(e.target.value)} />
                </div>
                <label>Description:</label>
                <textarea value={pdesc} cols="30" rows="10" onChange={(e) => setPdesc(e.target.value)} />
                <div className='fprice'>
                    <label>Discount:</label>
                    <input type="number" value={pdisc} onChange={(e) => setPdisc(e.target.value)} />
                </div>
                <div>
                    <label>ProductImg:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <br />
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default TrialForm;
