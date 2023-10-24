import { Helmet } from 'react-helmet-async';
import CategoryListView from 'src/sections/categories/category-list-view';
// sections

// ----------------------------------------------------------------------

export default function CategoryListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Categories List</title>
      </Helmet>

      <CategoryListView />
    </>
  );
}
