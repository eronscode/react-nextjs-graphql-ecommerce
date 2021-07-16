import React from 'react';
import Pagination from '../containers/Pagination';
import Products from '../containers/products/Products';

function ProductsPage() {
  return (
    <div>
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </div>
  );
}

export default ProductsPage;
