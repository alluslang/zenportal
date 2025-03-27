import { useState, useRef } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Snackbar } from '@mui/material';
import { Controller } from 'react-hook-form';

export default function EmergencyContactForm({ form, setStep }) {
  const { register, formState: { errors }, setValue, trigger, setFocus, control } = form;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fieldRefs = {
    emergencyContactName: useRef(null),
    emergencyContactPhone: useRef(null),
    emergencyContactAddress: useRef(null),
    emergencyContactRelation: useRef(null),
  };

  const formatPhoneNumber = (value) => {
    if (value.startsWith('0')) {
      return '+62' + value.slice(1);
    }
    return value;
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
      <Typography variant="h6" mb={2}>Emergency Contact Data</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label={
            <span>
              Emergency Contact Name <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('emergencyContactName')}
          error={!!errors.emergencyContactName}
          helperText={errors.emergencyContactName?.message}
          inputRef={fieldRefs.emergencyContactName}
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
              Phone/WhatsApp Number <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('emergencyContactPhone')}
          onChange={(e) => setValue('emergencyContactPhone', formatPhoneNumber(e.target.value), { shouldValidate: true })}
          error={!!errors.emergencyContactPhone}
          helperText={errors.emergencyContactPhone?.message}
          inputRef={fieldRefs.emergencyContactPhone}
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
            Address <span style={{ color: '#DB4646' }}>*</span>
          </span>
        }
        fullWidth
        {...register('emergencyContactAddress')}
        error={!!errors.emergencyContactAddress}
        helperText={errors.emergencyContactAddress?.message}
        inputRef={fieldRefs.emergencyContactAddress}
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
      <Controller
        name="emergencyContactRelation"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label={
              <span>
                Relation <span style={{ color: '#DB4646' }}>*</span>
              </span>
            }
            fullWidth
            {...field}
            error={!!errors.emergencyContactRelation}
            helperText={errors.emergencyContactRelation?.message}
            inputRef={fieldRefs.emergencyContactRelation}
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
          >
            <MenuItem value="">Select Relation</MenuItem>
            <MenuItem value="Parent">Parent</MenuItem>
            <MenuItem value="Sibling">Sibling</MenuItem>
            <MenuItem value="Spouse">Spouse</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        )}
      />
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
          onClick={() => setStep(3)}
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
            const isValid = await validateStep([
              'emergencyContactName', 'emergencyContactPhone',
              'emergencyContactAddress', 'emergencyContactRelation'
            ]);
            if (isValid) setStep(5);
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