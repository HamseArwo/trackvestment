import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Validate from "../utils/Validate";

interface signup {
  name: string;
  email: string;
  birthyear: number;
  password: string;
}

function SignupPage() {
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
  const [form, setForm] = useState<signup>({
    name: "",
    email: "",
    birthyear: 0,
    password: "",
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.status === 200) {
        navigate("/login");
      } else {
        setMessage("Error Signing up");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error Signing up");
    }
  };

  return (
    <section className="signup">
      <div>
        <h1>Sign Up</h1>
        <p>Please fill out the form below to create an account.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            required
          />
          <label htmlFor="birthyear">Birth Year:</label>
          <input
            onChange={handleChange}
            type="number"
            id="birthyear"
            name="birthyear"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            required
          />
          <label>
            {" "}
            Already have an account? <a href="/login">Login</a>
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <h2>{message}</h2>
    </section>
  );
}
export default SignupPage;
