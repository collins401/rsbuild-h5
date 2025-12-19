import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { dialog } from '@/components/dialog';
import { toast } from '@/components/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  agreeTerms: boolean
) => {
  if (!username) {
    toast.fail('请输入用户名');
    return false;
  }

  if (username.length < 3) {
    toast.fail('用户名至少需要3个字符');
    return false;
  }

  if (!email) {
    toast.fail('请输入邮箱地址');
    return false;
  }

  if (!EMAIL_REGEX.test(email)) {
    toast.fail('请输入有效的邮箱地址');
    return false;
  }

  if (!password) {
    toast.fail('请输入密码');
    return false;
  }

  if (password.length < 8) {
    toast.fail('密码至少需要8个字符');
    return false;
  }

  if (password !== confirmPassword) {
    toast.fail('两次输入的密码不一致');
    return false;
  }

  if (!agreeTerms) {
    toast.fail('请同意服务条款和隐私政策');
    return false;
  }

  return true;
};

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm(
      username,
      email,
      password,
      confirmPassword,
      agreeTerms
    );
    if (!isValid) return;

    setIsLoading(true);

    try {
      // 模拟注册请求
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('注册成功！');

      // 显示欢迎对话框
      await dialog.info({
        title: '注册成功！',
        content: `欢迎加入，${username}！\n验证邮件已发送至 ${email}`,
        okText: '开始使用',
      });
    } catch {
      toast.fail('注册失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsClick = async () => {
    await dialog.info({
      title: '服务条款',
      content: (
        <div className="text-left text-sm">
          <p className="mb-2">1. 用户应遵守相关法律法规</p>
          <p className="mb-2">2. 保护好您的账户信息</p>
          <p className="mb-2">3. 不得发布违规内容</p>
          <p>4. 我们重视您的隐私安全</p>
        </div>
      ),
      okText: '我知道了',
    });
  };

  return (
    <div className="flex min-h-screen min-h-svh items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        {/* Logo 和标题 */}
        <div className="mb-6 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            创建账户
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            填写信息以开始使用
          </p>
        </div>

        {/* 注册表单卡片 */}
        <div className=" p-8 ">
          <form onSubmit={handleSubmit}>
            {/* 用户名输入 */}
            <div className="mb-5">
              <label
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="username"
              >
                用户名
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  autoComplete="username"
                  className="h-10 pl-10"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="输入用户名"
                  type="text"
                  value={username}
                />
              </div>
              {username && username.length < 3 && (
                <p className="mt-1 text-xs text-red-500">
                  用户名至少需要3个字符
                </p>
              )}
            </div>

            {/* 邮箱输入 */}
            <div className="mb-5">
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
              {email && !EMAIL_REGEX.test(email) && (
                <p className="mt-1 text-xs text-red-500">
                  请输入有效的邮箱地址
                </p>
              )}
            </div>

            {/* 密码输入 */}
            <div className="mb-5">
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
                  autoComplete="new-password"
                  className="h-10 pl-10 pr-10"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="至少8个字符"
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
              {password && password.length < 8 && (
                <p className="mt-1 text-xs text-red-500">密码至少需要8个字符</p>
              )}
            </div>
            {/* 服务条款复选框 */}
            <div className="mb-6 flex items-start">
              <input
                checked={agreeTerms}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                id="terms"
                onChange={(e) => setAgreeTerms(e.target.checked)}
                type="checkbox"
              />
              <label
                className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                htmlFor="terms"
              >
                我同意{' '}
                <button
                  className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
                  onClick={handleTermsClick}
                  type="button"
                >
                  服务条款
                </button>{' '}
                和{' '}
                <button
                  className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
                  onClick={handleTermsClick}
                  type="button"
                >
                  隐私政策
                </button>
              </label>
            </div>

            {/* 注册按钮 */}
            <Button
              className="h-12 w-full bg-gradient-to-r from-purple-500 to-pink-600 text-base font-medium hover:from-purple-600 hover:to-pink-700"
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
                  注册中...
                </div>
              ) : (
                '创建账户'
              )}
            </Button>
          </form>
        </div>

        {/* 登录链接 */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          已有账户？{' '}
          <Link
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            to="/demo/sign-in"
          >
            立即登录
          </Link>
        </p>
      </div>
    </div>
  );
}
