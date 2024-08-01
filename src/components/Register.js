import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Define o estado inicial do formulário com campos de:
  // nome, email, senha e confirmação de senha
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // Define o estado para mensagens de sucesso ou erro
  const [message, setMessage] = useState("");
  // Define o estado para armazenar erros de validação
  const [errors, setErrors] = useState({});

  // Hook de navegação
  const navigate = useNavigate();

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Atualiza o estado com o valor do campo modificado
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia os dados do formulário para a API de registro
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}auth/register`,
        formData
      );
      // Define mensagem de sucesso
      setMessage("Registration successful");
      // Limpa os erros
      setErrors({});
      // Lida com a resposta da API, e.g., armazenar token, redirecionar, etc.
      console.log(response.data);
      // Redireciona para login
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        // Define mensagem de falha
        setMessage("Registration failed");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {/* Exibe erro de validação para o campo name */}
          {errors.name && <span>{errors.name[0]}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* Exibe erro de validação para o campo email */}
          {errors.email && <span>{errors.email[0]}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* Exibe erro de validação para o campo password */}
          {errors.password && <span>{errors.password[0]}</span>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
          {errors.password_confirmation && (
            <span>{errors.password_confirmation[0]}</span>
          )}
          {/* Exibe erro de validação para o campo password_confirmation */}
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
