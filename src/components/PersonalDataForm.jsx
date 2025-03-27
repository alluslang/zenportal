import { useState, useRef } from 'react';
import { TextField, Button, Box, Typography, Snackbar, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { Controller } from 'react-hook-form';

export default function PersonalDataForm({ form, setStep, profilePreview, setProfilePreview, ktpPreview, setKtpPreview }) {
  const { register, formState: { errors }, setValue, trigger, setFocus, control } = form;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fieldRefs = {
    profilePicture: useRef(null),
    firstName: useRef(null),
    lastName: useRef(null),
    gender: useRef(null),
    birthPlace: useRef(null),
    birthDate: useRef(null),
    religion: useRef(null),
    address: useRef(null),
    rtRw: useRef(null),
    kecamatan: useRef(null),
    kelurahan: useRef(null),
    city: useRef(null),
    postalCode: useRef(null),
    ktpNumber: useRef(null),
    ktpPhoto: useRef(null),
    maritalStatus: useRef(null),
    phoneNumber: useRef(null),
    email: useRef(null),
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
      console.log('Validation failed for field:', firstErrorField, 'Error:', errors[firstErrorField]); // Debugging
      setSnackbarMessage(`Please fill in the required field: ${firstErrorField}`);
      setSnackbarOpen(true);
      setFocus(firstErrorField);
      if (fieldRefs[firstErrorField]?.current) {
        fieldRefs[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    console.log('Validation successful'); // Debugging
    return true;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', p: 2 }}>
      <Typography variant="h6" mb={2}>Personal Data</Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label={
            <span>
              Upload Profile Picture <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          type="file"
          InputLabelProps={{ shrink: true }}
          fullWidth
          inputProps={{ accept: 'image/*' }}
          onChange={(e) => handleFileChange(e, setProfilePreview, 'profilePicture')}
          inputRef={fieldRefs.profilePicture}
          sx={{
            display: profilePreview ? 'none' : 'block',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': { borderColor: '#232323' },
              '&:hover fieldset': { borderColor: '#DB4646' },
            },
            '& .MuiInputLabel-root': { color: '#232323' },
            '& .MuiInputBase-input': { color: '#232323' },
          }}
        />
        {profilePreview && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <img
              src={profilePreview}
              alt="Profile Preview"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveFile(setProfilePreview, 'profilePicture')}
            >
              Remove
            </Button>
          </Box>
        )}
        {errors.profilePicture && (
          <Typography color="error" variant="body2">{errors.profilePicture.message}</Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label={
            <span>
              First Name <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          inputRef={fieldRefs.firstName}
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
              Last Name <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          inputRef={fieldRefs.lastName}
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
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label={
                <span>
                  Gender <span style={{ color: '#DB4646' }}>*</span>
                </span>
              }
              fullWidth
              {...field}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              inputRef={fieldRefs.gender}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#232323' },
                  '&:hover fieldset': { borderColor: '#DB4646' },
                },
                '& .MuiInputLabel-root': { color: '#232323' },
                '& .MuiInputBase-input': { color: '#232323' },
              }}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          )}
        />
        <TextField
          label={
            <span>
              Place of Birth <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('birthPlace')}
          error={!!errors.birthPlace}
          helperText={errors.birthPlace?.message}
          inputRef={fieldRefs.birthPlace}
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
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label={
            <span>
              Date of Birth <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          {...register('birthDate')}
          error={!!errors.birthDate}
          helperText={errors.birthDate?.message}
          inputRef={fieldRefs.birthDate}
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
        <Controller
          name="religion"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label={
                <span>
                  Religion <span style={{ color: '#DB4646' }}>*</span>
                </span>
              }
              fullWidth
              {...field}
              error={!!errors.religion}
              helperText={errors.religion?.message}
              inputRef={fieldRefs.religion}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#232323' },
                  '&:hover fieldset': { borderColor: '#DB4646' },
                },
                '& .MuiInputLabel-root': { color: '#232323' },
                '& .MuiInputBase-input': { color: '#232323' },
              }}
            >
              <MenuItem value="">Select Religion</MenuItem>
              <MenuItem value="Islam">Islam</MenuItem>
              <MenuItem value="Christianity">Christianity</MenuItem>
              <MenuItem value="Catholicism">Catholicism</MenuItem>
              <MenuItem value="Hinduism">Hinduism</MenuItem>
              <MenuItem value="Buddhism">Buddhism</MenuItem>
              <MenuItem value="Confucianism">Confucianism</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          )}
        />
      </Box>
      <TextField
        label={
          <span>
            Residential Address <span style={{ color: '#DB4646' }}>*</span>
          </span>
        }
        fullWidth
        {...register('address')}
        error={!!errors.address}
        helperText={errors.address?.message}
        inputRef={fieldRefs.address}
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
          label={
            <span>
              RT/RW <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('rtRw')}
          error={!!errors.rtRw}
          helperText={errors.rtRw?.message}
          inputRef={fieldRefs.rtRw}
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
              Sub-district <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('kecamatan')}
          error={!!errors.kecamatan}
          helperText={errors.kecamatan?.message}
          inputRef={fieldRefs.kecamatan}
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
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label={
            <span>
              Village <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('kelurahan')}
          error={!!errors.kelurahan}
          helperText={errors.kelurahan?.message}
          inputRef={fieldRefs.kelurahan}
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
              City <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('city')}
          error={!!errors.city}
          helperText={errors.city?.message}
          inputRef={fieldRefs.city}
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
            Postal Code <span style={{ color: '#DB4646' }}>*</span>
          </span>
        }
        fullWidth
        {...register('postalCode')}
        error={!!errors.postalCode}
        helperText={errors.postalCode?.message}
        inputRef={fieldRefs.postalCode}
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
      <TextField
        label={
          <span>
            KTP Number <span style={{ color: '#DB4646' }}>*</span>
          </span>
        }
        fullWidth
        {...register('ktpNumber')}
        error={!!errors.ktpNumber}
        helperText={errors.ktpNumber?.message}
        inputRef={fieldRefs.ktpNumber}
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
      <Box sx={{ mb: 2 }}>
        <TextField
          label={
            <span>
              Upload KTP Photo <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          type="file"
          InputLabelProps={{ shrink: true }}
          fullWidth
          inputProps={{ accept: 'image/*' }}
          onChange={(e) => handleFileChange(e, setKtpPreview, 'ktpPhoto')}
          inputRef={fieldRefs.ktpPhoto}
          sx={{
            display: ktpPreview ? 'none' : 'block',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': { borderColor: '#232323' },
              '&:hover fieldset': { borderColor: '#DB4646' },
            },
            '& .MuiInputLabel-root': { color: '#232323' },
            '& .MuiInputBase-input': { color: '#232323' },
          }}
        />
        {ktpPreview && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <img
              src={ktpPreview}
              alt="KTP Preview"
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveFile(setKtpPreview, 'ktpPhoto')}
            >
              Remove
            </Button>
          </Box>
        )}
        {errors.ktpPhoto && (
          <Typography color="error" variant="body2">{errors.ktpPhoto.message}</Typography>
        )}
      </Box>
      <Controller
        name="maritalStatus"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label={
              <span>
                Marital Status <span style={{ color: '#DB4646' }}>*</span>
              </span>
            }
            fullWidth
            {...field}
            error={!!errors.maritalStatus}
            helperText={errors.maritalStatus?.message}
            inputRef={fieldRefs.maritalStatus}
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
            <MenuItem value="">Select Marital Status</MenuItem>
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Divorced">Divorced</MenuItem>
          </TextField>
        )}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label={
            <span>
              Phone/WhatsApp Number <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('phoneNumber')}
          onChange={(e) => setValue('phoneNumber', formatPhoneNumber(e.target.value), { shouldValidate: true })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          inputRef={fieldRefs.phoneNumber}
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
              Email <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          inputRef={fieldRefs.email}
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
          component={Link}
          to="/"
          variant="outlined"
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
          Back to Login
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            const isValid = await validateStep([
              'profilePicture', 'firstName', 'lastName', 'gender', 'birthPlace', 'birthDate',
              'religion', 'address', 'rtRw', 'kecamatan', 'kelurahan', 'city', 'postalCode',
              'ktpNumber', 'ktpPhoto', 'maritalStatus', 'phoneNumber', 'email'
            ]);
            if (isValid) {
              setStep(2);
            }
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