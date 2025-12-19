import { Home, TouchpadOff, User2 } from 'lucide-react';
import { Suspense } from 'react';
import { Link } from 'wouter';
import { Loading } from '@/components/loading';
import { SafeArea } from '@/components/safe-area';

const navs = [
  { href: '/', icon: Home, label: '首页' },
  { href: '/todo', icon: TouchpadOff, label: '待办' },
  { href: '/user', icon: User2, label: '用户' },
];
export default function MainTabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <div className="box-border h-12">
        <div className="fixed bg-background h-12 text-center w-full bottom-0 border-t py-3 flex">
          {navs?.map((nav) => (
            <div className="flex-1" key={nav.href}>
              <Link
                className={(active) => (active ? 'text-primary' : '')}
                href={nav.href}
              >
                <nav.icon />
              </Link>
            </div>
          ))}
        </div>
        <SafeArea position="bottom" />
      </div>
    </>
  );
}
