import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../services/authApi";


const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[@$!%*?&]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await authApi.post("register/", {
        username: data.name,                
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data);

      alert(
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        "Registration failed"
      );
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
      }}
    >
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h4 className="text-center mb-3 fw-bold">Create Account</h4>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name */}
          <div className="mb-3">
            <input
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Username"
              {...register("name")}
            />
            <div className="invalid-feedback">
              {errors.name?.message}
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email Address"
              {...register("email")}
            />
            <div className="invalid-feedback">
              {errors.email?.message}
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              {...register("password")}
            />
            <div className="invalid-feedback">
              {errors.password?.message}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
          </div>

          {/* Submit */}
          <button
            className="btn btn-primary w-100"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
