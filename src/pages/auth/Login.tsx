import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import InputWithLabel from "../../components/InputLabel";
import TextInput from "../../components/TextInput";

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const { handleSubmit, control } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: "all",
  });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    console.log(data);
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="container w-full max-w-[400px] py-10 mx-auto shadow-lg rounded-lg bg-white/80 backdrop-blur-sm">
        {/* Header */}
        <div className="px-5 flex justify-center bg-transparent ">
          <p className="font-semibold text-2xl text-indigo-500 ">Login</p>
        </div>
        <form
          className="w-full p-4 flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => {
              return (
                <InputWithLabel label="Email:">
                  <TextInput {...field} />
                </InputWithLabel>
              );
            }}
          />
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => {
              return (
                <InputWithLabel label="Password:">
                  <TextInput {...field} />
                </InputWithLabel>
              );
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
