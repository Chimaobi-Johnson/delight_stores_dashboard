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
import MenuItem from '@mui/material/MenuItem';

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
            >
              New Category
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
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
                <TableRow key={el.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {el.name}
                  </TableCell>
                  <TableCell align="right">{el.description}</TableCell>
                  <TableCell align="right">{el.imageUrl}</TableCell>
                  <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                    <Tooltip title="Quick Edit" placement="top" arrow>
                        <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
                        <Iconify icon="solar:pen-bold" />
                        </IconButton>
                    </Tooltip>

                    <IconButton style={{ color: '#d57f7f'}} onClick={() => confirm.onTrue()}>
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
    <CategoryQuickEditForm categories={categories} open={quickEdit.value} onClose={quickEdit.onFalse} />

        <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
            <Button variant="contained" color="error">
            Delete
            </Button>
        }
        />
</>
  );
}
