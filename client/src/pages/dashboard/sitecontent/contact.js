import { Helmet } from 'react-helmet-async';
import SiteContactContentView from 'src/sections/sitecontent/contact-content';
// sections

// ----------------------------------------------------------------------

export default function SiteContactContent() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Site Contact Page Contents</title>
      </Helmet>

      <SiteContactContentView />
    </>
  );
}
