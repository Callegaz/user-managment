import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  AuthContainer,
  AuthForm,
  Input,
  Button,
  Title,
  AuthLink,
  ErrorText,
} from "./../styles";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { isDarkMode } = useTheme();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    const { error } = await signUp({ email, password, name });
    if (error) setError(error);
  };

  return (
    <AuthContainer $isDarkMode={isDarkMode} data-testid="signup-page">
      <Title>Criar Conta</Title>
      <AuthForm
        $isDarkMode={isDarkMode}
        onSubmit={handleSubmit}
        data-testid="signup-form"
      >
        <Input
          data-testid="name-input"
          $isDarkMode={isDarkMode}
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          data-testid="email-input"
          $isDarkMode={isDarkMode}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          data-testid="password-input"
          $isDarkMode={isDarkMode}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          data-testid="confirm-password-input"
          $isDarkMode={isDarkMode}
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && (
          <ErrorText data-testid="error-message" $isDarkMode={isDarkMode}>
            {error}
          </ErrorText>
        )}
        <Button type="submit" data-testid="signup-button">
          Cadastrar
        </Button>
        <AuthLink
          $isDarkMode={isDarkMode}
          data-testid="login-link"
          onClick={() => navigate("/login")}
        >
          Já tem uma conta? Faça login
        </AuthLink>
      </AuthForm>
    </AuthContainer>
  );
}
