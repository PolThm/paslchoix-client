import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Paths } from '@/types/enums';

const apiUrl = import.meta.env.VITE_API_URL;

const registerFormSchema = z
  .object({
    username: z.string().min(1, { message: "Nom d'utilisateur requis" }),
    email: z.string().email({ message: 'Adresse email non valide' }),
    password: z.string().min(6, {
      message: 'Le mot de passe doit contenir au moins 6 caractères',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe doivent correspondre',
    path: ['confirmPassword'], // This shows the error at confirmPassword field
  });

const RegisterPage: FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = registerFormSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,
    });

    if (result.success) {
      setFormErrors({});
      const userInfo = { username, email, password };
      fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.createdAt) {
            navigate(Paths.Login);
          } else {
            const errors: Record<string, string> = {};
            if (data.errorWith === 'username') {
              errors.username = "Ce nom d'utilisateur existe déjà";
            } else if (data.errorWith === 'email') {
              errors.email = 'Cette adresse email est déjà utilisée';
            } else if (data.message) {
              errors.submit = "Oups, une erreur s'est produite";
            }
            setFormErrors(errors);
          }
        })
        .catch((error) => {
          console.error(error);
          const errors: Record<string, string> = {};
          errors.submit =
            'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
          setFormErrors(errors);
        });
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
        Inscription
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" fullWidth error={!!formErrors.username}>
          <TextField
            id="username"
            type="text"
            label={"Nom d'utilisateur"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {formErrors.username && (
            <FormHelperText>{formErrors.username}</FormHelperText>
          )}
        </FormControl>
        <FormControl margin="normal" fullWidth error={!!formErrors.email}>
          <TextField
            id="email"
            type="email"
            label="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formErrors.email && (
            <FormHelperText>{formErrors.email}</FormHelperText>
          )}
        </FormControl>
        <FormControl margin="normal" fullWidth error={!!formErrors.password}>
          <TextField
            id="password"
            type="password"
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && (
            <FormHelperText>{formErrors.password}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          margin="normal"
          fullWidth
          error={!!formErrors.confirmPassword}
        >
          <TextField
            id="confirmPassword"
            type="password"
            label="Confirmation du mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {formErrors.confirmPassword && (
            <FormHelperText>{formErrors.confirmPassword}</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
        >
          S'inscrire
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

export default RegisterPage;
