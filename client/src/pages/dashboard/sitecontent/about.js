import { Helmet } from 'react-helmet-async';
import SiteAboutContentView from 'src/sections/sitecontent/about-content';
// sections

// ----------------------------------------------------------------------

export default function SiteAboutContent() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Site About Page Contents</title>
      </Helmet>

      <SiteAboutContentView />
    </>
  );
}
