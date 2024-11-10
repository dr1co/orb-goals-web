interface PostRegistrationInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type UserType = {
  id: string;
  name: string;
  email: string;
  error: string | null;
}

export async function postUserRegister(register: PostRegistrationInterface): Promise<UserType> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(register),
  });

  if (response.status === 500) {
    return {
      id: "",
      name: "",
      email: "",
      error: "E-mail already in use!",
    }
  }

  const data = response.json();
  return data;
}
