import { Form, type ActionFunctionArgs } from "react-router";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const gameTag = formData.get("gameTag");
  const isSuperAdmin = false;
  const createdAt = new Date();
  const updatedAt = new Date();
  const user = {
    username,
    email,
    password,
    gameTag,
    isSuperAdmin,
    createdAt,
    updatedAt,
  };
  console.log("User created:", user);
}

const NewUserPage = () => {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-blue-600">Crear nuevo usuario</h1>
      <Form
        method="post"
        className="flex flex-col gap-4 w-2xl mt-4 border-1 border-blue-100 p-6 rounded-2xl"
      >
        <Input type="text" placeholder="Usuario" name="username" />
        <Input type="email" placeholder="Correo" name="email" />
        <Input type="password" placeholder="Contraseña" name="password" />
        <Input type="text" placeholder="Game Tag" name="gameTag" />
        <Button
          className="cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 text-white"
          type="submit"
        >
          Create User
        </Button>
      </Form>
    </div>
  );
};

export default NewUserPage;
