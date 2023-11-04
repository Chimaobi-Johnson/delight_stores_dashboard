import { Helmet } from 'react-helmet-async';

// sections
import SiteProductDetailsView from 'src/sections/sitecontent/product-details';

// ----------------------------------------------------------------------

export default function SiteProductDetails() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Site Product Details</title>
      </Helmet>

      <SiteProductDetailsView />
    </>
  );
}