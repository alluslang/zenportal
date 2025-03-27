import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Typography } from '@mui/material';
import PersonalDataForm from '../components/PersonalDataForm';
import EducationHistoryForm from '../components/EducationHistoryForm';
import BankingDataForm from '../components/BankingDataForm';
import EmergencyContactForm from '../components/EmergencyContactForm';
import ReviewSubmitForm from '../components/ReviewSubmitForm';

const schema = yup.object({
  profilePicture: yup.mixed().required('Profile picture is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  gender: yup.string().required('Gender is required'),
  birthPlace: yup.string().required('Birth place is required'),
  birthDate: yup.date().required('Birth date is required'),
  religion: yup.string().required('Religion is required'),
  address: yup.string().required('Address is required'),
  rtRw: yup.string().required('RT/RW is required'),
  kecamatan: yup.string().required('Sub-district is required'),
  kelurahan: yup.string().required('Village is required'),
  city: yup.string().required('City is required'),
  postalCode: yup.string().required('Postal code is required'),
  ktpNumber: yup.string().required('KTP number is required').matches(/^[0-9]{16}$/, 'KTP number must be 16 digits'),
  ktpPhoto: yup.mixed().required('KTP photo is required'),
  maritalStatus: yup.string().required('Marital status is required'),
  phoneNumber: yup.string().required('Phone number is required').matches(/^\+628[0-9]{8,11}$/, 'Phone number must start with +628 and be 10-13 digits'),
  email: yup.string().email('Invalid email').required('Email is required'),
  educationLevel: yup.string().optional(),
  institutionName: yup.string().optional(),
  major: yup.string().optional(),
  graduationYear: yup.number().optional().min(1900).max(new Date().getFullYear()),
  lastJob: yup.string().optional(),
  companyName: yup.string().optional(),
  yearsWorked: yup.number().optional().min(0),
  lastPosition: yup.string().optional(),
  bankName: yup.string().required('Bank name is required'),
  accountNumber: yup.string().required('Account number is required'),
  accountHolder: yup.string().required('Account holder name is required'),
  npwpNumber: yup.string().matches(/^[0-9]{15}$/, 'NPWP number must be 15 digits').optional(),
  npwpPhoto: yup.mixed().when('npwpNumber', {
    is: (val) => val && val.length > 0,
    then: (schema) => schema.required('NPWP photo is required if NPWP number is provided'),
    otherwise: (schema) => schema.optional(),
  }),
  emergencyContactName: yup.string().required('Emergency contact name is required'),
  emergencyContactPhone: yup.string().required('Emergency contact phone is required').matches(/^\+628[0-9]{8,11}$/, 'Phone number must start with +628 and be 10-13 digits'),
  emergencyContactAddress: yup.string().required('Emergency contact address is required'),
  emergencyContactRelation: yup.string().required('Relation is required'),
  disclaimerAgreed: yup.boolean().oneOf([true], 'You must agree to the disclaimer'),
});

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [profilePreview, setProfilePreview] = useState(null);
  const [ktpPreview, setKtpPreview] = useState(null);
  const [npwpPreview, setNpwpPreview] = useState(null);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: '+62',
      emergencyContactPhone: '+62',
      gender: '',
      religion: '',
      maritalStatus: '',
      educationLevel: '',
      emergencyContactRelation: '',
      npwpNumber: '',
      npwpPhoto: null,
      disclaimerAgreed: false,
    },
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalDataForm
            form={form}
            setStep={setStep}
            profilePreview={profilePreview}
            setProfilePreview={setProfilePreview}
            ktpPreview={ktpPreview}
            setKtpPreview={setKtpPreview}
          />
        );
      case 2:
        return (
          <EducationHistoryForm
            form={form}
            setStep={setStep}
          />
        );
      case 3:
        return (
          <BankingDataForm
            form={form}
            setStep={setStep}
            npwpPreview={npwpPreview}
            setNpwpPreview={setNpwpPreview}
          />
        );
      case 4:
        return (
          <EmergencyContactForm
            form={form}
            setStep={setStep}
          />
        );
      case 5:
        return (
          <ReviewSubmitForm
            form={form}
            setStep={setStep}
          />
        );
      default:
        return <Typography>Step not implemented yet</Typography>;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: '#FFFFFF',
        p: 2,
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: '#FFFFFF',
          zIndex: 1000,
          width: '100%',
          maxWidth: '600px',
          py: 2,
          borderBottom: '1px solid #232323',
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          New Employee Form
        </Typography>
      </Box>
      {renderStep()}
    </Box>
  );
}