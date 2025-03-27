import { useState, useRef } from 'react';
import { TextField, Button, Box, Typography, Snackbar } from '@mui/material';

export default function BankingDataForm({ form, setStep, npwpPreview, setNpwpPreview }) {
  const { register, formState: { errors }, setValue, trigger, setFocus } = form;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fieldRefs = {
    bankName: useRef(null),
    accountNumber: useRef(null),
    accountHolder: useRef(null),
    npwpNumber: useRef(null),
    npwpPhoto: useRef(null),
  };

  const handleFileChange = (e, setPreview, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setValue(fieldName, file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = (setPreview, fieldName) => {
    setValue(fieldName, null, { shouldValidate: true });
    setPreview(null);
  };

  const validateStep = async (fields) => {
    const result = await trigger(fields, { shouldFocus: true });
    if (!result) {
      const firstErrorField = Object.keys(errors)[0];
      setSnackbarMessage(`Please fill in the required field: ${firstErrorField}`);
      setSnackbarOpen(true);
      setFocus(firstErrorField);
      if (fieldRefs[firstErrorField]?.current) {
        fieldRefs[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    return true;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', p: 2 }}>
      <Typography variant="h6" mb={2}>Banking Data</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label={
            <span>
              Bank Name <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('bankName')}
          error={!!errors.bankName}
          helperText={errors.bankName?.message}
          inputRef={fieldRefs.bankName}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': { borderColor: '#232323' },
              '&:hover fieldset': { borderColor: '#DB4646' },
            },
            '& .MuiInputLabel-root': { color: '#232323' },
            '& .MuiInputBase-input': { color: '#232323' },
          }}
        />
        <TextField
          label={
            <span>
              Account Number <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('accountNumber')}
          error={!!errors.accountNumber}
          helperText={errors.accountNumber?.message}
          inputRef={fieldRefs.accountNumber}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': { borderColor: '#232323' },
              '&:hover fieldset': { borderColor: '#DB4646' },
            },
            '& .MuiInputLabel-root': { color: '#232323' },
            '& .MuiInputBase-input': { color: '#232323' },
          }}
        />
      </Box>
      <TextField
        label={
          <span>
            Account Holder Name <span style={{ color: '#DB4646' }}>*</span>
          </span>
        }
        fullWidth
        {...register('accountHolder')}
        error={!!errors.accountHolder}
        helperText={errors.accountHolder?.message}
        inputRef={fieldRefs.accountHolder}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': { borderColor: '#232323' },
            '&:hover fieldset': { borderColor: '#DB4646' },
          },
          '& .MuiInputLabel-root': { color: '#232323' },
          '& .MuiInputBase-input': { color: '#232323' },
        }}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="NPWP Number"
          fullWidth
          {...register('npwpNumber')}
          error={!!errors.npwpNumber}
          helperText={errors.npwpNumber?.message}
          inputRef={fieldRefs.npwpNumber}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': { borderColor: '#232323' },
              '&:hover fieldset': { borderColor: '#DB4646' },
            },
            '& .MuiInputLabel-root': { color: '#232323' },
            '& .MuiInputBase-input': { color: '#232323' },
          }}
        />
        <Box sx={{ width: '100%' }}>
          <TextField
            label="Upload NPWP Photo"
            type="file"
            InputLabelProps={{ shrink: true }}
            fullWidth
            inputProps={{ accept: 'image/*' }}
            onChange={(e) => handleFileChange(e, setNpwpPreview, 'npwpPhoto')}
            inputRef={fieldRefs.npwpPhoto}
            sx={{
              display: npwpPreview ? 'none' : 'block',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': { borderColor: '#232323' },
                '&:hover fieldset': { borderColor: '#DB4646' },
              },
              '& .MuiInputLabel-root': { color: '#232323' },
              '& .MuiInputBase-input': { color: '#232323' },
            }}
          />
          {npwpPreview && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <img
                src={npwpPreview}
                alt="NPWP Preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveFile(setNpwpPreview, 'npwpPhoto')}
              >
                Remove
              </Button>
            </Box>
          )}
          {errors.npwpPhoto && (
            <Typography color="error" variant="body2">{errors.npwpPhoto.message}</Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          bgcolor: '#FFFFFF',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #232323',
          zIndex: 1000,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setStep(2)}
          sx={{
            borderColor: '#232323',
            color: '#232323',
            borderRadius: '8px',
            padding: '12px 0',
            fontWeight: 'bold',
            letterSpacing: '1px',
            width: '48%',
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            const isValid = await validateStep(['bankName', 'accountNumber', 'accountHolder', 'npwpNumber', 'npwpPhoto']);
            if (isValid) setStep(4);
          }}
          sx={{
            bgcolor: '#232323',
            color: '#F2F5F7',
            borderRadius: '8px',
            padding: '12px 0',
            fontWeight: 'bold',
            letterSpacing: '1px',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#DB4646',
              boxShadow: 'none',
            },
            width: '48%',
          }}
        >
          Next
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}