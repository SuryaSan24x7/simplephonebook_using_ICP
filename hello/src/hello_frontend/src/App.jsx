import React, { useState } from 'react';
import { hello_backend } from 'declarations/hello_backend';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const App = () => {
  const [activeForm, setActiveForm] = useState('insert');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [phone, setPhone] = useState('');
  const [searchName, setSearchName] = useState('');
  const [entry, setEntry] = useState(null);

  const clearFields = () => {
    setName('');
    setDesc('');
    setPhone('');
    setSearchName('');
  };

  const showAlert = (message) => {
    alert(message); // Using browser alert for simplicity
  };

  const handleInsert = async () => {
    try {
      const success = await hello_backend.insert(name, { name, desc, phone });
      if (success) {
        showAlert('Entry inserted successfully!');
        clearFields();
      } else {
        showAlert('Duplicate entry. This name already exists.');
      }
    } catch (error) {
      showAlert('Error inserting entry: ' + error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const success = await hello_backend.update(name, { name, desc, phone });
      if (success) {
        showAlert('Entry updated successfully!');
        clearFields();
      } else {
        showAlert('Entry not found for update.');
      }
    } catch (error) {
      showAlert('Error updating entry: ' + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const success = await hello_backend.delete(name);
      if (success) {
        showAlert('Entry deleted successfully!');
        clearFields();
      } else {
        showAlert('Entry not found for deletion.');
      }
    } catch (error) {
      showAlert('Error deleting entry: ' + error.message);
    }
  };

  const handleLookup = async () => {
    try {
      const result = await hello_backend.lookup(searchName);
      if (result[0].name) {
        setEntry(result);
        showAlert('Entry found.');
      } else  {
        showAlert('No entry found with that name.');
        setEntry(null); // Ensure the state is cleared when no results are found
      }
    } catch (error) {
      showAlert('Error looking up entry: ' + error.message);
      setEntry(null);
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">PhoneBook</a>
          <button className="btn btn-link link-light me-2" onClick={() => { setActiveForm('insert'); clearFields(); }}>Insert</button>
          <button className="btn btn-link link-light me-2" onClick={() => { setActiveForm('update'); clearFields(); }}>Update</button>
          <button className="btn btn-link link-light me-2" onClick={() => { setActiveForm('delete'); clearFields(); }}>Delete</button>
          <button className="btn btn-link link-light" onClick={() => { setActiveForm('lookup'); clearFields(); }}>Lookup</button>
        </div>
      </nav>

      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {activeForm === 'insert' && (
              <div>
                <h2>Insert New Entry</h2>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">Description:</label>
                  <input type="text" className="form-control" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone:</label>
                  <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button className="btn btn-primary" onClick={handleInsert}>Insert</button>
              </div>
            )}
            {activeForm === 'update' && (
  <div>
    <h2>Update Entry</h2>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name:</label>
      <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="desc" className="form-label">Description:</label>
      <input type="text" className="form-control" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="phone" className="form-label">Phone:</label>
      <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
    </div>
    <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
  </div>
)}
{activeForm === 'delete' && (
  <div>
    <h2>Delete Entry</h2>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name:</label>
      <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
  </div>
)}
{activeForm === 'lookup' && (
  <div>
    <h2>Lookup Entry</h2>
    <div className="mb-3">
      <label htmlFor="searchName" className="form-label">Name:</label>
      <input type="text" className="form-control" id="searchName" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
    </div>
    <button className="btn btn-secondary" onClick={handleLookup}>Lookup</button>
    {entry && (
      <div className="mt-3">
        <h4>Result:</h4>
        <p>Name: {entry[0].name}</p>
        <p>Description: {entry[0].desc}</p>
        <p>Phone: {entry[0].phone}</p>
      </div>
    )}
  </div>
)}

         </div>
        </div>
      </div>
    </>
  );
};

export default App;
