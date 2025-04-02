import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    bookName: '',
    bookType: '',
    bookRegionalProgram: '',
    bookImpact: 0,
    bookPhase: '',
    bookFunctionalityStatus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <label>
        Book Name:
        <input
          type="text"
          name="bookName"
          value={formData.bookName}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Type:
        <input
          type="text"
          name="bookType"
          value={formData.bookType}
          onChange={handleChange}
        />
      </label>
      <label>
        Regional Program:
        <input
          type="text"
          name="bookRegionalProgram"
          value={formData.bookRegionalProgram}
          onChange={handleChange}
        />
      </label>
      <label>
        Impact:
        <input
          type="number"
          name="bookImpact"
          value={formData.bookImpact}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Phase:
        <input
          type="text"
          name="bookPhase"
          value={formData.bookPhase}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Functionality Status:
        <input
          type="text"
          name="bookFunctionalityStatus"
          value={formData.bookFunctionalityStatus}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Book</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewBookForm;
