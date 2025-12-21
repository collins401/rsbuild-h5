import { Link } from 'wouter';

export default function TodoPage() {
  // const isLoggedIn = localStorage.getItem('token'); // Replace with your auth logic
  // if (!isLoggedIn) {
  //   return <Redirect to="~/sign-in" />;
  // }
  return (
    <div>
      User Page
      <Link href="~/profile/12">to 我的详情</Link>
    </div>
  );
}
