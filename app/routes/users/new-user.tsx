import type { User } from "@supabase/supabase-js";
import { useEffect } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { withErrorHandling } from "~/lib/supabaseErrorHandler";
import { userCreateSchema } from "~/schemas/user.schema";
import { supabase } from "~/supabase-client";

type ActionResponse =
  | {
      fieldErrors?: Record<string, string> | null;
      message?: string;
      success: boolean;
      details?: string;
    }
  | undefined;

export async function action({
  request,
}: ActionFunctionArgs): Promise<ActionResponse | Response> {
  const formData = await request.formData();

  const user = {
    name: formData.get("name"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    game_tag: formData.get("game_tag"),
    is_super_admin: false,
  };

  const validationResult = userCreateSchema.safeParse(user);

  if (!validationResult.success) {
    const fieldErrors: Record<string, string> = {};
    validationResult.error.errors.forEach((err) => {
      const path = err.path.join(".");
      fieldErrors[path] = err.message;
    });

    return {
      success: false,
      fieldErrors,
      message: "Please check the form fields.",
    };
  }

  const { error, details } = await withErrorHandling<User[]>(
    async () =>
      await supabase.from("Users").insert(validationResult.data).select(),
    { tableName: "Users" }
  );

  // Handle database errors
  if (error) {
    return {
      success: false,
      fieldErrors: null,
      message: error,
      details,
    };
  }

  return {
    success: true,
    fieldErrors: null,
    message: "Usuario creado con exito!",
  };
  // Success case
  // return redirect("/users");
}

const NewUserPage = () => {
  const actionData = useActionData<ActionResponse>();
  const navigate = useNavigate();

  // Handle toast notifications and navigation
  useEffect(() => {
    if (actionData?.success) {
      // Show success toast
      toast.success(actionData.message || "Usuario creado con éxito");

      // Set a timeout to redirect after the toast is shown
      // const redirectTimer = setTimeout(() => {
      //   navigate("/users");
      // }, 1500); // Adjust timing as needed (1.5 seconds)

      // Clean up timer if component unmounts
      // return () => clearTimeout(redirectTimer);
    }
  }, [actionData, navigate]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-blue-600">Crear nuevo usuario</h1>
      <Form
        method="post"
        className="flex flex-col gap-4 w-full max-w-md mt-4 border border-blue-100 p-6 rounded-2xl"
      >
        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Nombre"
            name="name"
            required
            aria-invalid={actionData?.fieldErrors?.name ? "true" : undefined}
          />
          {actionData?.fieldErrors?.name && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.name}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Apellido"
            name="lastName"
            required
            aria-invalid={
              actionData?.fieldErrors?.lastName ? "true" : undefined
            }
          />
          {actionData?.fieldErrors?.lastName && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.lastName}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="email"
            placeholder="Correo"
            name="email"
            required
            aria-invalid={actionData?.fieldErrors?.email ? "true" : undefined}
          />
          {actionData?.fieldErrors?.email && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="password"
            placeholder="Contraseña"
            name="password"
            required
            aria-invalid={
              actionData?.fieldErrors?.password ? "true" : undefined
            }
          />
          {actionData?.fieldErrors?.password && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.password}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Game Tag"
            name="game_tag"
            required
            aria-invalid={
              actionData?.fieldErrors?.game_tag ? "true" : undefined
            }
          />
          {actionData?.fieldErrors?.game_tag && (
            <p className="text-sm text-red-500">
              {actionData.fieldErrors.game_tag}
            </p>
          )}
        </div>

        {/* Display database errors */}
        {actionData?.message && !actionData.fieldErrors && (
          <div className="mt-4 p-2 bg-red-200 rounded-sm text-center">
            <span className="text-red-600">
              {!actionData.success && actionData.message}
              {/* {actionData.details && (
                <p className="text-xs mt-1">
                  {JSON.stringify(actionData.details)}
                </p>
              )} */}
            </span>
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
