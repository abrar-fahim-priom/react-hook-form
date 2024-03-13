import { useForm } from "react-hook-form";
import Field from "../Field";
import FieldSet from "../FieldSet";

export default function LoginFrom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = (formData) => {
    console.log(formData);

    const user = { email: "x@gmail.com", password: 1223456789 };

    const found =
      formData.email === user.email && formData.password === user.password;
    //global error handling, valuating user
    if (!found) {
      setError("root.random", {
        message: `User with ${formData.email} is not found`,
        type: "User error",
      });
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit(submitForm)}
    >
      <FieldSet label="Enter Login Details">
        <Field label="Email" error={errors.email}>
          <input
            {...register("email", { required: "Email is required" })}
            className={`p-1 border border-box w-[300px] rounded-md ${
              errors.email ? "border-red-500" : "border-gray-400"
            } `}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
          />
        </Field>
        <Field label="Password" error={errors.password}>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters",
              },
            })}
            className={`p-1 border border-box w-[300px] rounded-md ${
              errors.password ? "border-red-500" : "border-gray-400"
            } `}
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
          />
        </Field>

        <div> {errors?.root?.random?.message} </div>

        <Field>
          <button className="text-lg m-auto text-white cursor-pointer p-1 border rounded-lg bg-purple-400">
            Login
          </button>
        </Field>
      </FieldSet>
    </form>
  );
}
