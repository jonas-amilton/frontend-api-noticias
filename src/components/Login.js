import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // Define o estado inicial do fornulário com campos de:
  // email, senha
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Define o estado para mensagens de sucesso ou erro
  const [message, setMessage] = useState("");
  // Define o estado para armazenar erros de validação
  const [errors, setErrors] = useState("");

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
      // Envia os dados do formulário para API, na rota de login
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}auth/login`,
        formData
      );
      // Define mensagem de sucesso
      setMessage("Login successfull");
      // Limpa os erros
      setErrors({});
      // Lida com a response da API, e.g, armazenar token, redirecionar, etc...
      console.log(response.data);
      // Redireciona para view de noticias
      navigate("/noticias");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        // Define mensagem de falha
        setMessage("Login failed");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/** Exibe erro de validação para o campo email */}
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
          {/** Exibe erro de validação para o campo password */}
          {errors.password && <span>{errors.password}</span>}
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Não tem cadastro? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;
