import { Helmet } from 'react-helmet-async';
// sections
import FiveView from 'src/sections/actions/add-discount-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Five</title>
      </Helmet>

      <FiveView />
    </>
  );
}
