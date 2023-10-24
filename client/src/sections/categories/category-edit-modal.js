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
import { fData } from 'src/utils/format-number';
import { styled } from '@mui/material/styles';

import { useState, useCallback } from 'react';

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

export default function CategoryQuickEditForm({ categories, open, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputData, setInputData] = useState({
    name: '',
    description: '',
    imageUrl: null,
  });

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    if (file) {
      setInputData((prevState) => ({
        ...prevState,
        imageUrl: newFile,
      }));
      // setValue('imageUrl', newFile, { shouldValidate: true });
    }
  }, []);

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
      <DialogTitle>Edit Category</DialogTitle>

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
          <TextField id="category_name" label="Category Name" variant="outlined" />
          <TextField id="category_description" label="Description" variant="outlined" />

          <Box sx={{ mb: 2 }}>
            <Button component="label" variant="contained">
              Upload Image
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

CategoryQuickEditForm.propTypes = {
  categories: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
