import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { RootState } from "@/redux/store";
import authApi from "@/services/authApi";
import { REGEX_PASSWORD } from "@/constant";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.user.loading);

  const onFinish = async (values: any) => {
    try {
      const response = await authApi.register(values);
      if (response.status === 200) {
        toast.success("Tạo người dùng thành công");
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.data);
        toast.error(error.response?.data.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Register
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign up for an account
            </h1>
            <Form
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              className="space-y-4 md:space-y-6">
              <Form.Item
                label="User Name"
                name="username"
                rules={[
                  { required: true, message: "Username is required" },
                  { min: 8, message: "Username must be at least 8 characters" },
                  {
                    max: 42,
                    message: "Username must be less than 42 characters",
                  },
                ]}>
                <Input placeholder="User Name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Must be a valid email" },
                ]}>
                <Input placeholder="Your Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password is required" },
                  {
                    pattern: REGEX_PASSWORD,
                    message:
                      "Password must be at least 8 characters and include at least one uppercase, one lowercase letter, and one number",
                  },
                ]}>
                <Input.Password placeholder="*****" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmpassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Confirm password is required" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords must match"));
                    },
                  }),
                ]}>
                <Input.Password placeholder="******" />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" type="primary" className="w-full">
                  {loading ? <FaSpinner /> : "Sign Up"}
                </Button>
              </Form.Item>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                You have an account?
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline ml-1">
                  Sign in
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
