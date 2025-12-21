import { ChevronLeft, ChevronRight, Plus, Scan } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'wouter';
import { SafeArea } from '@/components/safe-area';
import { toast } from '@/components/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  projectName: string;
  workOrderType: string;
  deviceName: string;
  deviceLocation: string;
  isProxy: boolean;
  description: string;
  photos: string[];
}

export default function FormPage() {
  const [_, setLocation] = useLocation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      projectName: '武汉数字运营中心项目测试专用',
      isProxy: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    toast.success('提交成功');
    // 提交逻辑
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-background border-b sticky top-0 z-10">
        <button className="p-1 -ml-1" onClick={() => setLocation('/app')}>
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-medium text-center text-gray-900 mr-6">
          机电设备报事
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        <form className="bg-background" onSubmit={handleSubmit(onSubmit)}>
          {/* 项目名称 */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 active:bg-gray-50 transition-colors">
            <label className="w-24 text-sm text-gray-600 shrink-0">
              <span className="text-red-500 mr-1">*</span>项目名称
            </label>
            <div className="flex-1 flex items-center justify-end text-right overflow-hidden">
              <span className="text-sm text-gray-900 truncate">
                武汉数字运营中心项目测试专用
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
            </div>
          </div>

          {/* 工单类型 */}
          <div className="flex relative items-center justify-between px-4 py-4 border-b border-gray-100 active:bg-gray-50 transition-colors">
            <label className="w-24 text-sm text-gray-600 shrink-0">
              <span className="text-red-500 mr-1">*</span>工单类型
            </label>
            <div className="flex-1 flex flex-col items-end justify-center">
              <div className="flex items-center">
                <input
                  type="hidden"
                  {...register('workOrderType', { required: '请选择工单类型' })}
                />
                <span className="text-sm text-gray-400">请选择</span>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
              </div>
              {errors.workOrderType && (
                <span className="text-xs absolute right-4 bottom-0 text-red-500 mt-1">
                  {errors.workOrderType.message}
                </span>
              )}
            </div>
          </div>

          {/* 设备名称 */}
          <div className="flex justify-between px-4 py-3 border-b border-gray-100">
            <label className="w-24 text-sm text-gray-600 shrink-0 py-1.5">
              <span className="text-red-500 mr-1">*</span>设备名称
            </label>
            <div className="flex-1 flex flex-col items-end">
              <div className="flex items-center w-full">
                <Input
                  {...register('deviceName', { required: '请输入设备名称' })}
                  className="border-none shadow-none text-right px-0 focus-visible:ring-0 placeholder:text-gray-400 h-auto py-1"
                  placeholder="请输入"
                />
                <Scan className="w-5 h-5 text-blue-500 ml-2 shrink-0" />
              </div>
              {errors.deviceName && (
                <span className="text-xs text-red-500 mt-0.5">
                  {errors.deviceName.message}
                </span>
              )}
            </div>
          </div>

          {/* 设备位置 */}
          <div className="flex justify-between px-4 py-3 border-b border-gray-100">
            <label className="w-24 text-sm text-gray-600 shrink-0 py-1.5">
              <span className="text-red-500 mr-1">*</span>设备位置
            </label>
            <div className="flex-1 flex flex-col items-end">
              <Input
                {...register('deviceLocation', { required: '请输入设备位置' })}
                className="border-none shadow-none text-right px-0 focus-visible:ring-0 placeholder:text-gray-400 h-auto py-1"
                placeholder="请输入"
              />
              {errors.deviceLocation && (
                <span className="text-xs text-red-500 mt-0.5">
                  {errors.deviceLocation.message}
                </span>
              )}
            </div>
          </div>

          {/* 代客报事 */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <label className="text-sm text-gray-600">代客报事</label>
            <Controller
              control={control}
              name="isProxy"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* 分隔条 */}
          <div className="h-3 bg-gray-50" />

          {/* 添加照片 */}
          <div className="px-4 py-4  bg-background">
            <div className="flex justify-between mb-3">
              <label className="block text-sm text-gray-600">
                <span className="text-red-500 mr-1">*</span>添加照片
              </label>
              {errors.photos && (
                <span className="text-xs text-red-500">
                  {errors.photos.message}
                </span>
              )}
            </div>
            <div className="w-20 h-20 border border-dashed border-blue-300 rounded-lg flex items-center justify-center bg-blue-50/30 active:bg-blue-50 transition-colors">
              <Plus className="w-8 h-8 text-blue-500" />
            </div>
            <input
              type="hidden"
              {...register('photos', {
                validate: (val) => (val && val.length > 0) || '请输入添加照片',
              })}
            />
          </div>

          {/* 分隔条 */}
          <div className="h-3 bg-gray-50" />

          {/* 工单描述 */}
          <div className="px-4 py-4  bg-background mb-4">
            <div className="flex justify-between mb-3">
              <label className="block text-sm text-gray-600">
                <span className="text-red-500 mr-1">*</span>工单描述
              </label>
              {errors.description && (
                <span className="text-xs text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <Textarea
              {...register('description', { required: '请输入工单描述' })}
              className="bg-gray-100 border-none min-h-[120px]"
              maxLength={200}
              placeholder="请输入内容"
              showCount
            />
          </div>
        </form>
      </div>

      {/* Footer Button */}
      <div className="p-4  bg-background border-t sticky bottom-0">
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white h-11 text-base rounded-lg font-normal"
          onClick={handleSubmit(onSubmit)}
        >
          提交
        </Button>
        <SafeArea />
      </div>
    </div>
  );
}
