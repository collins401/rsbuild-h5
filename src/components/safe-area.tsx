interface SafeAreaProps {
  position?: 'top' | 'bottom';
}
export function SafeArea({ position = 'bottom' }: SafeAreaProps) {
  const style =
    position === 'top'
      ? { paddingTop: 'env(safe-area-inset-top)' }
      : { paddingBottom: 'env(safe-area-inset-bottom)' };
  return <div style={style} />;
}
