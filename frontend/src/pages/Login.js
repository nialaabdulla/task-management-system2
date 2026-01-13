import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import authApi from "../services/authApi";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
     
      localStorage.removeItem("token");

      const res = await authApi.post("login/", {
        username: data.username.trim(),
        password: data.password,
      });

     
      localStorage.setItem("token", res.data.access);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data);

      alert(
        error.response?.data?.error ||
        "Invalid username or password"
      );
    }
  };

  return (
    <div className="auth-page">
      <motion.form
        className="auth-card"
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2>Welcome Back</h2>
        <p>Login to your account</p>

        {/* Username */}
        <input
          placeholder="Username"
          autoComplete="username"
          {...register("username", {
            required: "Username is required",
          })}
        />
        {errors.username && (
          <div className="auth-error">{errors.username.message}</div>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <div className="auth-error">{errors.password.message}</div>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          className="auth-btn"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </motion.button>

        <div className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </motion.form>
    </div>
  );
}

export default Login;
