import { Controller, useFieldArray, useForm } from "react-hook-form";
import Field from "../Field";
import FieldSet from "../FieldSet";
import NumberInput from "../NumberInput";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: "socials",
    control,
  });

  const submitForm = (formData) => {
    console.log(formData);
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit(submitForm)}
    >
      <FieldSet label="Enter Registration Details">
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
        <Field label="Full name" error={errors.fname}>
          <input
            {...register("fname", {
              required: "Full name is required",
            })}
            className={`p-1 border border-box w-[300px] rounded-md ${
              errors.fname ? "border-red-500" : "border-gray-400"
            } `}
            type="text"
            name="fname"
            id="fname"
            placeholder="Enter Fullname"
          />
        </Field>

        <Field label="Age" error={errors.age}>
          <Controller //here's how we can use external components with react-hook-form
            name="age"
            control={control}
            defaultValue={1}
            render={({ field: { ref, ...field } }) => (
              <NumberInput
                id="age"
                className={`p-2 border box-border w-full rounded-md ${
                  errors.age ? "border-red-500" : "border-gray-200"
                }`}
                {...field}
              />
            )}
            rules={{
              max: {
                value: 100,
                message: "Age can be between 0 and 100",
              },
            }}
          />
        </Field>

        <div> {errors?.root?.random?.message} </div>
      </FieldSet>

      <FieldSet label="Enter Social Handles">
        {fields.map((field, index) => {
          return (
            <div
              className="flex justify-between items-center w-max"
              key={field.id}
            >
              <Field label="Social Name" error={errors?.socials?.[index]?.name}>
                <input
                  {...register(`socials[${index}].name`, {
                    required: "Social is required",
                  })}
                  type="text"
                  name={`socials[${index}].name`}
                  id={`socials[${index}].name`}
                  className="p-2 border box-border w-full rounded-md"
                />
              </Field>

              <Field label="Social URL " error={errors?.socials?.[index]?.url}>
                <input
                  className="p-2 border box-border w-full rounded-md"
                  type="text"
                  {...register(`socials[${index}].url`, {
                    required: "Social link is required",
                  })}
                  id={`socials[${index}].url`}
                  name={`socials[${index}].url`}
                />
              </Field>
              <button
                className="mt-8 mr-2 text-2xl"
                onClick={() => remove(index)}
              >
                &#8722;
              </button>
            </div>
          );
        })}

        <button
          className="mt-8 text-md text-white cursor-pointer border rounded-lg bg-gray-500 p-1 m-auto"
          onClick={() => {
            append({ name: "", url: "" });
          }}
        >
          Add Social Handle
        </button>
      </FieldSet>
      <button className="text-lg m-auto text-white cursor-pointer p-1 border rounded-lg bg-purple-400">
        Register
      </button>
    </form>
  );
}
