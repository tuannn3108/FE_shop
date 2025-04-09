import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToken, setUser } from "@/redux/userSlice/UserSlice";
import type { RootState } from "@/redux/store";
import authApi from "@/services/authApi";
import { toast } from "react-toastify";
import { Form, Input, Button } from "antd";
import { FaSpinner } from "react-icons/fa";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.user.loading);

  const onFinish = async (values: { username: string; password: string }) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.login(values);
      if (response.status === 200) {
        const { user, token } = response.data.data;

        dispatch(setUser(user));
        dispatch(setToken(token));
        localStorage.setItem("userToken", JSON.stringify(token));
        localStorage.setItem("userInfo", JSON.stringify(user));

        toast.success("Đăng nhập thành công");
        navigate("/");
      } else {
        toast.error("Đăng nhập không thành công");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập không thành công");
    } finally {
      dispatch(setLoading(false));
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
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <Form
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              className="space-y-4">
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Username is required" }]}>
                <Input placeholder="User Name" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}>
                <Input.Password placeholder="******" />
              </Form.Item>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Input type="checkbox" className="w-4 h-4" />
                  <label className="text-sm text-gray-500">Remember me</label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full flex justify-center items-center">
                  {loading ? <FaSpinner className="animate-spin" /> : "Login"}
                </Button>
              </Form.Item>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline ml-1">
                  Sign up
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
