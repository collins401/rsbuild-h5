import type React from 'react';
import { Button } from '@/components/ui/button';
import Catch from './errorBoundary';

// import { Button } from 'antd-mobile';
/**
 * 包裹组件，在渲染错误的时候显示
 * <ErrorBoundary>
 *    <RError />
 * </ErrorBoundary>
 */
interface Props {
  children: React.ReactNode;
}

const systemUpdateFlag = 'Loading chunk';
const AlertSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 130 80" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient
        id="a"
        x1="52.348%"
        x2="52.348%"
        y1="74.611%"
        y2="-17.635%"
      >
        <stop offset="0%" stopColor="#DEDEDE" stopOpacity="0" />
        <stop offset="100%" stopColor="#A9A9A9" stopOpacity=".3" />
      </linearGradient>
      <linearGradient id="b" x1="44.79%" x2="44.79%" y1="100%" y2="0%">
        <stop offset="0%" stopColor="#FFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#96A1C5" stopOpacity=".373" />
      </linearGradient>
      <linearGradient id="c" x1="50%" x2="50%" y1="100%" y2="-19.675%">
        <stop offset="0%" stopColor="#FFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#919191" stopOpacity=".15" />
      </linearGradient>
      <linearGradient id="d" x1="50%" x2="50%" y1="0%" y2="44.95%">
        <stop offset="0%" stopColor="#5389F5" />
        <stop offset="100%" stopColor="#416FDC" />
      </linearGradient>
      <linearGradient id="e" x1="63.345%" x2="63.345%" y1="100%" y2="-5.316%">
        <stop offset="0%" stopColor="#DCE9FF" />
        <stop offset="100%" stopColor="#B6CFFF" />
      </linearGradient>
      <linearGradient id="f" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#7CA5F7" />
        <stop offset="100%" stopColor="#C4D6FC" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(-1.866 .364)">
      <path
        d="M27.94 14.864c1.326-4.192 2.56-6.802 3.7-7.831 3.157-2.848 7.522-1.298 8.45-1.076 3.26.782 2.2-4.364 4.997-5.41 1.864-.697 3.397.155 4.6 2.556C50.752.863 52.375-.163 54.556.02c3.272.277 4.417 11.328 8.913 8.909 4.497-2.42 10.01-2.973 12.365.623.509.778.704-.429 4.166-4.55C83.462.88 86.914-.936 93.996 1.464c3.22 1.09 5.868 4.045 7.947 8.864 0 6.878 5.06 10.95 15.178 12.213 15.179 1.895 3.397 18.214-15.178 22.993-18.576 4.78-61.343 7.36-84.551-4.716C1.92 32.769 5.436 24.117 27.939 14.864z"
        fill="url(#a)"
        opacity=".8"
      />
      <ellipse cx="66" cy="69.166" fill="url(#b)" rx="27.987" ry="6.478" />
      <path
        d="M113.25 77.249c-21.043 5.278-92.87-.759-100.515-3.516-3.721-1.343-7.075-3.868-10.061-7.576a2.822 2.822 0 0 1 2.198-4.593h125.514c2.605 6.938-3.107 12.166-17.136 15.685z"
        fill="url(#c)"
        opacity=".675"
      />
      <g fillRule="nonzero">
        <path
          d="M43.396 12.098L33.825.906a2.434 2.434 0 0 0-1.837-.86h-20.58c-.706 0-1.377.324-1.837.86L0 12.098v6.144h43.396v-6.144z"
          fill="url(#d)"
          transform="translate(44.08 39.707)"
        />
        <path
          d="M40.684 18.468L32.307 8.72a2.136 2.136 0 0 0-1.622-.725H12.711c-.617 0-1.22.256-1.622.725l-8.377 9.748v5.354h37.972v-5.354z"
          fill="url(#e)"
          transform="translate(44.08 39.707)"
        />
        <path
          d="M43.396 25.283c0 .853-.384 1.62-.99 2.134l-.123.1a2.758 2.758 0 0 1-1.67.56H2.784c-.342 0-.669-.062-.971-.176l-.15-.06A2.802 2.802 0 0 1 0 25.282V12.165h10.529c1.163 0 2.1.957 2.1 2.118v.015c0 1.162.948 2.099 2.111 2.099h13.916a2.113 2.113 0 0 0 2.111-2.107c0-1.166.938-2.125 2.1-2.125h10.53z"
          fill="url(#f)"
          transform="translate(44.08 39.707)"
        />
      </g>
    </g>
  </svg>
);
const ErrorBoundary = Catch((props: Props, error?: Error) => {
  if (error) {
    // 检查是否为网络错误
    if (!navigator.onLine) {
      return (
        <div className="px-5 pt-10 text-center">
          <AlertSvg className="h-[120px] mx-auto" />
          <h3 className="mb-2 font-500 mt-4">网络连接已断开</h3>
          <p className="mb-4 text-color/60">请检查网络连接后重试</p>
          <Button onClick={() => location.reload()} variant="default">
            重新加载
          </Button>
        </div>
      );
    }
    return error.message.includes(systemUpdateFlag) ? (
      <div className="px-5 pt-10 text-center">
        <AlertSvg className="h-[120px] mx-auto" />
        {/* <h3 className="mb-2 font-500">项目已更新</h3> */}
        <p className="mb-0 text-color/60 mt-4">很抱歉，中断了您当前的操作！</p>
        <p className="mb-4 text-color/60">
          为了更好的使用系统新功能，请手动刷新页面
        </p>
        <Button
          onClick={() => {
            sessionStorage.clear();
            localStorage.clear();
            location.reload();
          }}
          variant="default"
        >
          立即更新
        </Button>
      </div>
    ) : (
      <div className="px-5 pt-10 text-center">
        <AlertSvg className="h-[120px] mx-auto" />
        <div className="mt-4 max-w-xl mx-auto">
          <p className="mb-2 text-base text-color/60">很抱歉，页面出错了</p>
          <div className="rounded bg-danger/30 text-color/60 px-4 py-2 text-left">
            <div className="text-sm">错误信息:</div>
            {error.message}
          </div>
        </div>
        <div className="mt-4">
          <a
            className="hover:!underline text-primary"
            onClick={() => {
              window.history.back();
              setTimeout(() => {
                window.location.reload();
              }, 200);
            }}
          >
            返回上一页
          </a>
          <span className="mx-1">或</span>
          <a
            className="hover:!underline text-primary"
            onClick={() => location.reload()}
          >
            刷新当前页
          </a>
        </div>
      </div>
    );
  }
  return props.children;
});

export default ErrorBoundary;
