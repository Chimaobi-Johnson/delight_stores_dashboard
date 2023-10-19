import { Helmet } from 'react-helmet-async';
import AddDiscountView from 'src/sections/actions/add-discount-view';

// ----------------------------------------------------------------------

export default function AddDiscount() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Add Discount</title>
      </Helmet>

    <AddDiscountView />
    </>
  );
}
