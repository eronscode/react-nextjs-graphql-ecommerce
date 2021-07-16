import { useRouter } from 'next/router';
import React from 'react';
import Pagination from '../../containers/Pagination';
import Products from '../../containers/products/Products';

function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <div>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}

export default ProductsPage;
