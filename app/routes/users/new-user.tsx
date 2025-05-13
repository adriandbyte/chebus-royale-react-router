import type { User } from "@supabase/supabase-js";
import {
  Form,
  redirect,
  useActionData,
  type ActionFunctionArgs,
} from "react-router";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { withErrorHandling } from "~/lib/supabaseErrorHandler";
import { supabase } from "~/supabase-client";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const gameTag = formData.get("gameTag");

  if (!email || !username || !password || !gameTag) {
    return {
      error: "Fields email, username, password, and gameTag are required.",
    };
  }

  const user = {
    username,
    email,
    password,
    game_tag: gameTag,
    is_super_admin: false,
  };

  const { error, details } = await withErrorHandling<User[]>(
    async () => await supabase.from("Users").insert(user).select(),
    { tableName: "Users" }
  );

  if (error) {
    return { error, details };
  }

  return redirect("/users");
}

const NewUserPage = () => {
  const response = useActionData();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-blue-600">Crear nuevo usuario</h1>
      <Form
        method="post"
        className="flex flex-col gap-4 w-full max-w-md mt-4 border border-blue-100 p-6 rounded-2xl"
      >
        <Input type="text" placeholder="Usuario" name="username" required />
        <Input type="email" placeholder="Correo" name="email" required />
        <Input
          type="password"
          placeholder="Contraseña"
          name="password"
          required
        />
        <Input type="text" placeholder="Game Tag" name="gameTag" required />

        {response && response.error && (
          <div className="mt-4 p-2 bg-red-200 rounded-sm">
            <span className="text-red-600">{response.error}</span>
          </div>
        )}

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
