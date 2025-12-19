import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { toast } from '@/components/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.fail('请输入邮箱地址');
      return;
    }

    if (!password) {
      toast.fail('请输入密码');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      toast.fail('请输入有效的邮箱地址');
      return;
    }

    setIsLoading(true);

    try {
      // 模拟登录请求
      localStorage.setItem('token', 'dummy-token');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('登录成功！');
    } catch {
      toast.fail('登录失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    // const confirmed = await dialog.confirm({
    //   title: '重置密码',
    //   content: '确定要发送重置密码邮件吗？',
    //   okText: '发送',
    //   cancelText: '取消',
    // });
    // if (confirmed) {
    //   toast.success('重置邮件已发送');
    // }
  };

  return (
    <div className="flex min-h-screen min-h-svh items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        {/* Logo 和标题 */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            欢迎回来
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            登录您的账户以继续
          </p>
        </div>

        {/* 登录表单卡片 */}
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            {/* 邮箱输入 */}
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="email"
              >
                邮箱地址
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  autoComplete="email"
                  className="h-10 pl-10"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  type="email"
                  value={email}
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div className="mb-6">
              <label
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="password"
              >
                密码
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  autoComplete="current-password"
                  className="h-10 pl-10 pr-10"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* 忘记密码 */}
            <div className="mb-6 text-right">
              <button
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={handleForgotPassword}
                type="button"
              >
                忘记密码？
              </button>
            </div>

            {/* 登录按钮 */}
            <Button
              className="h-12 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-base font-medium hover:from-blue-600 hover:to-purple-700"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                  登录中...
                </div>
              ) : (
                '登录'
              )}
            </Button>
          </form>
        </div>

        {/* 注册链接 */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          还没有账户？{' '}
          <Link
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            to="/demo/sign-up"
          >
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
}
