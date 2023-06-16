import React, { useState, useEffect } from 'react';
import { db } from '../index'; // Assuming you've set up the firebase.js file

const Categories = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the existing categories/collections from Firestore
    db.collection('Category')
      .get()
      .then((snapshot) => {
        const fetchedCategories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setCategoryType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new collection in Firestore
    db.collection('Category')
      .add({
        name: categoryName,
        type: categoryType,
      })
      .then(() => {
        console.log('Category created successfully!');
        // Reset the form inputs
        setCategoryName('');
        setCategoryType('');
      })
      .catch((error) => {
        console.error('Error creating category:', error);
      });
  };

  return (
    <div>
      <h2>Create a New Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="categoryType">Category Type:</label>
          <input
            type="text"
            id="categoryType"
            value={categoryType}
            onChange={handleTypeChange}
          />
        </div>
        <button type="submit">Create Category</button>
      </form>

      <h2>Existing Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} - {category.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
