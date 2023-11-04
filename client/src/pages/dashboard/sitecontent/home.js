import { Helmet } from 'react-helmet-async';
import SiteHomeContentView from 'src/sections/sitecontent/home-content';
// sections

// ----------------------------------------------------------------------

export default function SiteHomeContent() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Home Page Contents</title>
      </Helmet>

      <SiteHomeContentView />
    </>
  );
}
