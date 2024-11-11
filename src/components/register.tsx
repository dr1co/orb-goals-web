import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/galaxy.png";
import hourglass from "../assets/hourglass.svg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { postUserRegister } from "../api/post-user-register";
import { UserContext } from "../contexts/user";

export const Register = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [validInputs, setValidInputs] = useState([true, true, true, true]);

  const validateName = () => {
    if (name.length < 3) {
      return false;
    }

    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    if (!email.match(emailRegex)) {
      return false;
    }

    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      return false;
    }

    return true;
  };

  const validatePasswordConfirmation = () => {
    if (password !== confirmPassword) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newValidInputs = [
      validateName(),
      validateEmail(),
      validatePassword(),
      validatePasswordConfirmation(),
    ];
    setValidInputs(newValidInputs);

    if (
      validateName() &&
      validateEmail() &&
      validatePassword() &&
      validatePasswordConfirmation()
    ) {
      const newUser = await postUserRegister({
        name,
        email,
        password,
        confirmPassword,
      });

      if (newUser.error) {
        setWarning(newUser.error);
      } else {
        context?.setUser(newUser);
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
            Create a new account!
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <div className="flex items-center mt-1">
              <span className="inline-block px-2 text-purple-400">
                <i className="fas fa-user"></i>
              </span>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your beautiful name!"
                className={`w-full ${
                  validInputs[0] ? "" : "border border-red-500"
                }`}
              />
            </div>
            <Label
              className={`text-red-500 mt-1 text-xs ${
                validInputs[0] ? "hidden" : "flex"
              }`}
            >
              Your name must have at least 3 characters!
            </Label>
          </div>

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
                  validInputs[1] ? "" : "border border-red-500"
                }`}
              />
            </div>
            <Label
              className={`text-red-500 mt-1 text-xs ${
                validInputs[1] ? "hidden" : "flex"
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
                className={`w-full ${
                  validInputs[2] ? "" : "border border-red-500"
                }`}
              />
            </div>
            <Label
              className={`text-red-500 mt-1 text-xs ${
                validInputs[2] ? "hidden" : "flex"
              }`}
            >
              Your password should have at least 6 characters!
            </Label>
          </div>

          <div>
            <Label>Confirm password</Label>
            <div className="flex items-center mt-1">
              <span className="inline-block px-2 text-purple-400">
                <i className="fas fa-lock"></i>
              </span>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat the super secret password!"
                className={`w-full ${
                  validInputs[3] ? "" : "border border-red-500"
                }`}
              />
            </div>
            <Label
              className={`text-red-500 mt-1 text-xs ${
                validInputs[3] ? "hidden" : "flex"
              }`}
            >
              Passwords must match!
            </Label>
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
        <Label className={`text-red-500 mt-1 ${warning ? "flex" : "hidden"}`}>
          {warning}
        </Label>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-violet-300 hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};
