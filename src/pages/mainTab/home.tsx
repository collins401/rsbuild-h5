import { Link } from 'wouter';
import { dialog } from '@/components/dialog';
import { ModeToggle } from '@/components/mode-toggle';
import { toast } from '@/components/toast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

export default function Home() {
  const handleInfoDialog = async () => {
    const result = await dialog.confirm({
      title: '确认操作',
      content: '您确定要执行此操作吗？',
      okText: '确认',
      cancelText: '取消',
    });
    console.log('infoResult', result);

    await dialog.confirm({
      title: '确认操作',
      content: '您确定要执行此操作吗111？',
      okText: '确认',
      cancelText: '取消',
    });
  };

  const handleConfirmDialog = async () => {
    const result = await dialog.confirm({
      title: '确认操作',
      content: '您确定要执行此操作吗？',
      okText: '确认',
      cancelText: '取消',
    });

    if (result) {
      toast.success('已确认');
    } else {
      toast.info('已取消');
    }
  };

  const handleAlertDialog = () => {
    dialog.alert({
      title: '警告',
      content: '这是一个警告提示，只有确定按钮',
    });
  };

  const handleAsyncDialog = async () => {
    await dialog.confirm({
      title: '异步操作',
      content: '点击确定后将模拟异步操作',
      onOk: async () => {
        // toast.loading('处理中...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // toast.hide();
        toast.success('操作成功');
      },
    });
  };
  return (
    <div className="">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <Input className="mt-4 w-64" placeholder="Type something..." />
      <Checkbox />
      <Link href="/todo">to todo</Link>
      <Button
        onClick={() => {
          toast.show('提交成功', 'loading', { duration: 2000 });
        }}
      >
        open toast
      </Button>
      <div className="space-y-2">
        <Button className="w-full" onClick={handleInfoDialog}>
          信息对话框 (info)
        </Button>
        <Button className="w-full" onClick={handleConfirmDialog}>
          确认对话框 (confirm)
        </Button>
        <Button className="w-full" onClick={handleAlertDialog}>
          警告对话框 (alert)
        </Button>
        <Button className="w-full" onClick={handleAsyncDialog} render={<div />}>
          异步操作对话框
        </Button>
        {/* <Button className="w-full" onClick={handleCustomDialog}>
          自定义对话框
        </Button> */}
      </div>
      <ModeToggle />
      <Spinner />
      <Spinner className="text-red-500" />
      <Spinner className="inline-block" />
      <Spinner size={40} />
    </div>
  );
}
