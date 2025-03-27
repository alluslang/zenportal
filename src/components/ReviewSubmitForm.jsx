import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Checkbox, FormControlLabel, Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ReviewSubmitForm({ form, setStep }) {
  const { handleSubmit, formState: { errors }, setValue, trigger, watch } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();

  const formData = watch();

  const uploadFile = async (file, path) => {
    if (!file) return null;
    const { error } = await supabase.storage
      .from('employee-files')
      .upload(path, file);
    if (error) throw error;
    const { data: publicData } = supabase.storage
      .from('employee-files')
      .getPublicUrl(path);
    return publicData.publicUrl;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Upload files ke Supabase Storage
      const profilePictureUrl = await uploadFile(
        data.profilePicture,
        `profile_pictures/${data.ktpNumber}_${Date.now()}`
      );
      const ktpPhotoUrl = await uploadFile(
        data.ktpPhoto,
        `ktp_photos/${data.ktpNumber}_${Date.now()}`
      );
      const npwpPhotoUrl = await uploadFile(
        data.npwpPhoto,
        `npwp_photos/${data.ktpNumber}_${Date.now()}`
      );

      // Simpan data ke Supabase menggunakan fungsi save_employee
      const { data: result, error } = await supabase.rpc('save_employee', {
        p_profile_picture: profilePictureUrl,
        p_first_name: data.firstName,
        p_last_name: data.lastName,
        p_gender: data.gender,
        p_birth_place: data.birthPlace,
        p_birth_date: data.birthDate,
        p_religion: data.religion,
        p_address: data.address,
        p_rt_rw: data.rtRw,
        p_kecamatan: data.kecamatan,
        p_kelurahan: data.kelurahan,
        p_city: data.city,
        p_postal_code: data.postalCode,
        p_ktp_number: data.ktpNumber,
        p_ktp_photo: ktpPhotoUrl,
        p_marital_status: data.maritalStatus,
        p_phone_number: data.phoneNumber,
        p_email: data.email,
        p_education_level: data.educationLevel || null,
        p_institution_name: data.institutionName || null,
        p_major: data.major || null,
        p_graduation_year: data.graduationYear || null,
        p_last_job: data.lastJob || null,
        p_company_name: data.companyName || null,
        p_years_worked: data.yearsWorked || null,
        p_last_position: data.lastPosition || null,
        p_bank_name: data.bankName,
        p_account_number: data.accountNumber,
        p_account_holder: data.accountHolder,
        p_npwp_number: data.npwpNumber || null,
        p_npwp_photo: npwpPhotoUrl || null,
        p_emergency_contact_name: data.emergencyContactName,
        p_emergency_contact_phone: data.emergencyContactPhone,
        p_emergency_contact_address: data.emergencyContactAddress,
        p_emergency_contact_relation: data.emergencyContactRelation,
      });

      if (error) throw error;

      setSubmitSuccess(true);
      setSubmitMessage(`Form submitted successfully! Employee ID: ${result}. Awaiting approval from HR Manager. Once approved, a verification link will be sent to your email.`);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitSuccess(false);
      setSubmitMessage('Failed to submit form: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitSuccess) {
      // Redirect ke halaman login setelah 3 detik
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, navigate]);

  const validateStep = async () => {
    const result = await trigger(['disclaimerAgreed']);
    if (!result) {
      setSubmitMessage('Please agree to the disclaimer');
      setSubmitSuccess(false);
      return false;
    }
    return true;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', p: 2 }}>
      <Typography variant="h6" mb={2}>Review & Submit</Typography>
      {submitMessage && (
        <Alert
          severity={submitSuccess ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {submitMessage}
        </Alert>
      )}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">Personal Data</Typography>
        <Typography>First Name: {formData.firstName || '-'}</Typography>
        <Typography>Last Name: {formData.lastName || '-'}</Typography>
        <Typography>Gender: {formData.gender || '-'}</Typography>
        <Typography>Place of Birth: {formData.birthPlace || '-'}</Typography>
        <Typography>Date of Birth: {formData.birthDate || '-'}</Typography>
        <Typography>Religion: {formData.religion || '-'}</Typography>
        <Typography>Address: {formData.address || '-'}</Typography>
        <Typography>RT/RW: {formData.rtRw || '-'}</Typography>
        <Typography>Sub-district: {formData.kecamatan || '-'}</Typography>
        <Typography>Village: {formData.kelurahan || '-'}</Typography>
        <Typography>City: {formData.city || '-'}</Typography>
        <Typography>Postal Code: {formData.postalCode || '-'}</Typography>
        <Typography>KTP Number: {formData.ktpNumber || '-'}</Typography>
        <Typography>Marital Status: {formData.maritalStatus || '-'}</Typography>
        <Typography>Phone Number: {formData.phoneNumber || '-'}</Typography>
        <Typography>Email: {formData.email || '-'}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">Education History</Typography>
        <Typography>Highest Education Level: {formData.educationLevel || '-'}</Typography>
        <Typography>Institution Name: {formData.institutionName || '-'}</Typography>
        <Typography>Major: {formData.major || '-'}</Typography>
        <Typography>Graduation Year: {formData.graduationYear || '-'}</Typography>
        <Typography>Last Job: {formData.lastJob || '-'}</Typography>
        <Typography>Company Name: {formData.companyName || '-'}</Typography>
        <Typography>Years Worked: {formData.yearsWorked || '-'}</Typography>
        <Typography>Position: {formData.lastPosition || '-'}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">Banking Data</Typography>
        <Typography>Bank Name: {formData.bankName || '-'}</Typography>
        <Typography>Account Number: {formData.accountNumber || '-'}</Typography>
        <Typography>Account Holder Name: {formData.accountHolder || '-'}</Typography>
        <Typography>NPWP Number: {formData.npwpNumber || '-'}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">Emergency Contact Data</Typography>
        <Typography>Name: {formData.emergencyContactName || '-'}</Typography>
        <Typography>Phone Number: {formData.emergencyContactPhone || '-'}</Typography>
        <Typography>Address: {formData.emergencyContactAddress || '-'}</Typography>
        <Typography>Relation: {formData.emergencyContactRelation || '-'}</Typography>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => setValue('disclaimerAgreed', e.target.checked, { shouldValidate: true })}
            sx={{ color: '#232323', '&.Mui-checked': { color: '#DB4646' } }}
          />
        }
        label={
          <Typography sx={{ color: '#232323' }}>
            I agree to the terms and conditions
          </Typography>
        }
      />
      <Typography sx={{ color: '#232323', fontSize: '12px', mt: 1, mb: 2 }}>
        By submitting this form, you affirm that the information provided is accurate and complete to the best of your knowledge. Any false information, negligence, or omission that results in loss or damages will be the sole responsibility of the person submitting the form. The data entered will be stored in the company's database and may be used for legitimate business purposes, ensuring it is handled appropriately and without misuse.
      </Typography>
      {errors.disclaimerAgreed && (
        <Typography color="error" variant="body2">{errors.disclaimerAgreed.message}</Typography>
      )}
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
          onClick={() => setStep(4)}
          disabled={isSubmitting}
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
            const isValid = await validateStep();
            if (isValid) handleSubmit(onSubmit)();
          }}
          disabled={isSubmitting}
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isSubmitting ? (
            <>
              <CircularProgress size={20} sx={{ color: '#F2F5F7', mr: 1 }} />
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </Box>
    </Box>
  );
}