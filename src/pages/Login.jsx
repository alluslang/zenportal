import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Typography, TextField, Button, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-zgi-icon.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else alert('Login successful');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#FFFFFF', // Background putih
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '300px',
          p: 4,
          bgcolor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #232323', // Border hitam
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={logo} alt="Zenportal Logo" style={{ width: '120px', marginBottom: '20px' }} />
        <TextField
          label={
            <span>
              Email <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
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
              Password <span style={{ color: '#DB4646' }}>*</span>
            </span>
          }
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '& fieldset': { borderColor: '#232323' },
              '&:hover fieldset': { borderColor: '#DB4646' },
            },
            '& .MuiInputLabel-root': { color: '#232323' },
            '& .MuiInputBase-input': { color: '#232323' },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ width: '100%', textAlign: 'right', mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: '#046BAA', cursor: 'pointer' }}
            component={Link}
            to="/forgot-password"
          >
            Forgot Password?
          </Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
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
          }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: '#232323' }}>
            Don't have an account?{' '}
            <Typography
              variant="body2"
              component={Link}
              to="/signup"
              sx={{ color: '#046BAA', display: 'inline' }}
            >
              Sign Up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}