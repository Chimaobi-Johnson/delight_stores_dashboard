import axios from 'axios';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// api
import { useGetProduct } from 'src/api/product';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductNewEditForm from '../product-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductEditView({ id }) {
  const settings = useSettingsContext();

  const [ product, setProduct ] = useState(null);
  const [ category, setCategory ] = useState(null);


  useEffect(() => {
    const getProduct = () => {
      axios.get(`/api/product/?id=${id}`)
      .then(data => {
        console.log(data)
        if(data.status === 200) {
          setProduct(data.data.product[0])
          setCategory(data.data.product[0].categoryDetails[0])
        }
      }).catch(error => {
        console.log(error)
      })
    }
    getProduct()
  }, [id])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Products',
            href: paths.dashboard.products.root,
          },
          { name: product?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductNewEditForm currentProduct={product} category={category} />
    </Container>
  );
}

ProductEditView.propTypes = {
  id: PropTypes.string,
};
