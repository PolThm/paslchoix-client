import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAuth } from '@/contexts/AuthContext';
import { useLoginUser } from '@/mutations/user';
import { useFetchUser } from '@/queries/user';
import { Paths } from '@/types/enums';

const loginFormSchema = z.object({
  loginUsername: z.string().min(1, { message: "Nom d'utilisateur requis" }),
  loginPassword: z
    .string()
    .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

const LoginPage: FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const loginUserMutation = useLoginUser();
  const { data: userData } = useFetchUser(localStorage.getItem('token') || '');

  useEffect(() => {
    if (userData?.isLoggedIn) {
      setUser({ isLoggedIn: true, username: userData.username });
      navigate(Paths.Home);
    }
  }, [navigate, setUser, userData]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const result = loginFormSchema.safeParse({ loginUsername, loginPassword });

    if (result.success) {
      const user = { username: loginUsername, password: loginPassword };

      try {
        await loginUserMutation.mutateAsync(user, {
          onSuccess: (data) => {
            if (data.token) {
              localStorage.setItem('token', data.token);
            } else {
              const errors: Record<string, string> = {};
              data.errorWith === 'loginUsername' // eslint-disable-line @typescript-eslint/no-unused-expressions
                ? (errors.loginUsername = "Ce nom d'utilisateur n'existe pas")
                : (errors.loginPassword = 'Mot de passe incorrect');
              setFormErrors(errors);
            }
          },
          onError: (error) => {
            console.log('error', error);
            const errors: Record<string, string> = {};
            errors.submit =
              'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
            setFormErrors(errors);
          },
        });
      } catch (error) {
        console.error('error', error);
      }
    } else {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      setFormErrors(errors);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" align="center" gutterBottom sx={{ mb: 4 }}>
        Connexion
      </Typography>
      <form onSubmit={handleLogin}>
        <FormControl
          margin="normal"
          fullWidth
          error={!!formErrors.loginUsername}
        >
          <TextField
            id="loginUsername"
            type="text"
            label={"Nom d'utilisateur"}
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          {formErrors.loginUsername && (
            <FormHelperText>{formErrors.loginUsername}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          margin="normal"
          fullWidth
          error={!!formErrors.loginPassword}
        >
          <TextField
            id="loginPassword"
            type="password"
            label="Mot de passe"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          {formErrors.loginPassword && (
            <FormHelperText>{formErrors.loginPassword}</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
        >
          Se connecter
        </Button>
        <FormControl margin="normal" fullWidth error={!!formErrors.submit}>
          {formErrors.submit && (
            <FormHelperText>{formErrors.submit}</FormHelperText>
          )}
        </FormControl>
      </form>
    </Container>
  );
};

export default LoginPage;
