import PropTypes from 'prop-types';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { fData } from 'src/utils/format-number';
import { styled } from '@mui/material/styles';
import Iconify from 'src/components/iconify';

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function AddDiscountModal({ editing, open, onClose }) {



  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <DialogTitle>Add/Edit Discount</DialogTitle>

      <DialogContent>

        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          component="form"
          mt={2}
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          {/* <TextField
            id="category_name"
            value={inputData.name}
            onChange={(e) => changeInputHandler('name', e)}
            label="Category Name"
            variant="outlined"
          />
          <TextField
            id="category_description"
            value={inputData.description}
            onChange={(e) => changeInputHandler('description', e)}
            label="Description"
            variant="outlined"
          /> */}

        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained">
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

const imageStyles = {
  width: '200px',
  height: '170px',
  marginRight: '2rem',
  marginBottom: '2rem',
  marginTop: '2rem',
};

AddDiscountModal.propTypes = {
//   category: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  editing: PropTypes.bool,

};
