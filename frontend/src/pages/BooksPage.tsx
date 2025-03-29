import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div
      className="row align-items-stretch"
      style={{ backgroundColor: '#f0f0f0' }}
    >
      <div className="container-fluid mt-4 px-5">
        <CartSummary />
        <WelcomeBand />
        <div className="row align-items-stretch">
          <div className="col-md-4 col-lg-3 d-flex">
            <div className="w-100">
              <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </div>
          <div className="col-md-8 col-lg-9 d-flex flex-column">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
