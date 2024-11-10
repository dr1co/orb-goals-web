interface LoginUserInterface {
  email: string;
  password: string;
}

type UserType = {
  id: string;
  name: string;
  email: string;
  error: string | null;
}

export async function postUserLogin(login: LoginUserInterface): Promise<UserType> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  });

  if (response.status === 422 || response.status === 500) {
    return {
      id: "",
      name: "",
      email: "",
      error: "Invalid e-mail or password",
    }
  }

  const data = response.json();
  return data;
}