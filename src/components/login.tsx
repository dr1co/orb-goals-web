import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/galaxy.png";
import hourglass from "../assets/hourglass.svg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { UserContext } from "../contexts/user";
import { postUserLogin } from "../api/post-user-login";

export const Login = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [warning, setWarning] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    if (!email.match(emailRegex)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setValidEmail(validateEmail());
    if (validateEmail()) {
      const user = await postUserLogin({
        email,
        password,
      });

      if (user.error) {
        setWarning(user.error);
      } else {
        context.setUser(user);
        setTimeout(() => null, 2000);
        navigate("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-80">
      <img src={hourglass} className="opacity-10" />
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
        <div className="flex items-center justify-center gap-4">
          <img src={logo} alt="Orb.goals Logo" className="w-10 h-10" />
          <h2 className="text-3xl font-bold text-violet-300">
            Login into Orb.goals!
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>E-mail</Label>
            <div className="flex items-center mt-1">
              <span className="inline-block px-2 text-purple-400">
                <i className="fas fa-envelope"></i>
              </span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className={`w-full ${
                  validEmail ? "" : "border border-red-500"
                }`}
              />
            </div>
            <Label
              className={`text-red-500 mt-1 text-xs ${
                validEmail ? "hidden" : "flex"
              }`}
            >
              Please insert a valid e-mail!
            </Label>
          </div>

          <div>
            <Label>Password</Label>
            <div className="flex items-center mt-1">
              <span className="inline-block px-2 text-purple-400">
                <i className="fas fa-lock"></i>
              </span>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Super secret password here!"
                className="w-full"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <Label className={`text-red-500 mt-1 ${warning ? "flex" : "hidden"}`}>
          {warning}
        </Label>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-violet-300 hover:underline"
          >
            Create one here
          </a>
        </p>
      </div>
    </div>
  );
};
