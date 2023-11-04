import Container from '@mui/material/Container';

// hooks
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// routes
import { paths } from 'src/routes/paths';


export default function SiteContactContentView() {
    const settings = useSettingsContext();

    return (
        <>
           <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
            heading="Site Contact Page Details"
            links={[
                { name: 'Dashboard', href: paths.dashboard.root },
                { name: 'Site Content', href: paths.dashboard.site.root },
                { name: 'Edit Contact Page Details' },
            ]}
            sx={{
                mb: { xs: 3, md: 5 },
            }}
            />
            </Container>
            </>
    )
}