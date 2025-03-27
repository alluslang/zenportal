import { useRef } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

export default function EducationHistoryForm({ form, setStep }) {
  const { register, formState: { errors }, trigger, setFocus, control } = form;

  const fieldRefs = {
    educationLevel: useRef(null),
    institutionName: useRef(null),
    major: useRef(null),
    graduationYear: useRef(null),
    lastJob: useRef(null),
    companyName: useRef(null),
    yearsWorked: useRef(null),
    lastPosition: useRef(null),
  };

  const validateStep = async (fields) => {
    const result = await trigger(fields, { shouldFocus: true });
    if (!result) {
      const firstErrorField = Object.keys(errors)[0];
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
      <Typography variant="h6" mb={2}>Education History</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Controller
          name="educationLevel"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Highest Education Level"
              fullWidth
              {...field}
              error={!!errors.educationLevel}
              helperText={errors.educationLevel?.message}
              inputRef={fieldRefs.educationLevel}
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
              <MenuItem value="">Select Education Level</MenuItem>
              <MenuItem value="SD">Elementary School</MenuItem>
              <MenuItem value="SMP">Junior High School</MenuItem>
              <MenuItem value="SMA/SMK">Senior High School/Vocational</MenuItem>
              <MenuItem value="D3">Diploma (D3)</MenuItem>
              <MenuItem value="S1">Bachelor's Degree (S1)</MenuItem>
              <MenuItem value="S2">Master's Degree (S2)</MenuItem>
              <MenuItem value="S3">Doctorate (S3)</MenuItem>
            </TextField>
          )}
        />
        <TextField
          label="Institution Name"
          fullWidth
          {...register('institutionName')}
          error={!!errors.institutionName}
          helperText={errors.institutionName?.message}
          inputRef={fieldRefs.institutionName}
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
          label="Major"
          fullWidth
          {...register('major')}
          error={!!errors.major}
          helperText={errors.major?.message}
          inputRef={fieldRefs.major}
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
          label="Graduation Year"
          type="number"
          fullWidth
          {...register('graduationYear')}
          error={!!errors.graduationYear}
          helperText={errors.graduationYear?.message}
          inputRef={fieldRefs.graduationYear}
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
          label="Last Job"
          fullWidth
          {...register('lastJob')}
          error={!!errors.lastJob}
          helperText={errors.lastJob?.message}
          inputRef={fieldRefs.lastJob}
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
          label="Company Name"
          fullWidth
          {...register('companyName')}
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
          inputRef={fieldRefs.companyName}
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
          label="Years Worked"
          type="number"
          fullWidth
          {...register('yearsWorked')}
          error={!!errors.yearsWorked}
          helperText={errors.yearsWorked?.message}
          inputRef={fieldRefs.yearsWorked}
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
          label="Position"
          fullWidth
          {...register('lastPosition')}
          error={!!errors.lastPosition}
          helperText={errors.lastPosition?.message}
          inputRef={fieldRefs.lastPosition}
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
          variant="outlined"
          onClick={() => setStep(1)}
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
              'educationLevel', 'institutionName', 'major', 'graduationYear',
              'lastJob', 'companyName', 'yearsWorked', 'lastPosition'
            ]);
            if (isValid) setStep(3);
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
    </Box>
  );
}