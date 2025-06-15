import type {
  FieldErrors,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";

type InputControllerProps = {
  register: UseFormRegister<FieldValues>;
  label: string;
  name: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  errors: FieldErrors;
};

export const InputController: React.FC<InputControllerProps> = ({
  register,
  label,
  name,
  id,
  type = "text",
  errors,
}) => {
  return (
    <div>
      <label
        htmlFor="quantidadeParcelas"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        id={id}
        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
          type === "number"
            ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            : ""
        }`}
      />
      {errors[name] && typeof errors[name]?.message === "string" && (
        <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  );
};
