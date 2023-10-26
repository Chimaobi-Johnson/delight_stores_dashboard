import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Image from 'src/components/image';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';


import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';

import { useSettingsContext } from 'src/components/settings';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import axios from 'axios';
import CategoryQuickEditForm from './category-edit-modal';

export default function CategoryListView() {
  const settings = useSettingsContext();

  const popover = usePopover();

  const quickEdit = useBoolean();

  const confirm = useBoolean();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = () => {
      axios
        .get('/api/categories')
        .then((data) => {
          setCategories(data.data.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCategories();
  }, []);

  const [formEditing, setFormEditing] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const initEditCategoryHandler = (type, data) => {
    if (type === 'new') {
      setFormEditing(false);
      setSelectedCat(null);
      quickEdit.onTrue();
    } else {
      setFormEditing(true);
      setSelectedCat(data);
      quickEdit.onTrue();
    }
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const initDeleteHandler = (cat) => {
    setSelectedCat(cat);
    confirm.onTrue();
  };
  const deleteCategoryHandler = () => {
    setLoading(true);
    setErrorMessage(null);
    axios
      .post(`/api/category/delete/?id=${selectedCat._id}`)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          window.location.reload();
        }
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage('Server eror. Check connection or try again later');
        confirm.onFalse()
      });
  };

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.categories.root },
            { name: 'Category', href: paths.dashboard.categories.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.categories.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => initEditCategoryHandler('new')}
            >
              New Category
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        {errorMessage ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        ) : (
          ''
        )}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length !== 0
                ? categories.map((el) => (
                    <TableRow
                      key={el.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {el.name}
                      </TableCell>
                      <TableCell align="right">{el.description}</TableCell>
                      <TableCell align="right">
                        <Image
                          key={el.imageUrl}
                          alt="category dp"
                          src={el.imageUrl}
                          ratio="1/1"
                          sx={{ width: '50%', cursor: 'zoom-in' }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                        <Tooltip title="Quick Edit" placement="top" arrow>
                          <IconButton
                            color={quickEdit.value ? 'inherit' : 'default'}
                            onClick={() => initEditCategoryHandler('', el)}
                          >
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        </Tooltip>

                        <IconButton
                          style={{ color: '#d57f7f' }}
                          onClick={() => initDeleteHandler(el)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <CategoryQuickEditForm
        category={selectedCat}
        editing={formEditing}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <LoadingButton
            loading={loading}
            variant="contained"
            type='submit'
            onClick={() => deleteCategoryHandler()}
            color="error"
          >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}
