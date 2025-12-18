import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Validate from "../utils/Validate";
interface login {
  email: string;
  password: string;
}
function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedinCheck = async () => {
      const loggedin = await Validate();
      if (loggedin) {
        navigate("/dashboard");
      }
    };
    loggedinCheck();
  }, [navigate]);
  const [form, setForm] = useState<login>({
    email: "",
    password: "",
  });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // optional
        navigate("/dashboard"); // redirect to dashboard
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="signup">
      <div>
        <h1>Log In</h1>
        <p>Please fill out the form below to log into your account.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={updateForm}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={updateForm}
          />
          <label>
            {" "}
            Don't have an account? <a href="/trackvestment/signup">Signup</a>
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    </section>
  );
}
export default LoginPage;
