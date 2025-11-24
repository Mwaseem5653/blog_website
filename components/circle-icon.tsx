
const CircleIcon = ({ size = 'w-12 h-12', outerColor = 'bg-blue-500', innerColor = 'bg-blue-300' }: { size?: string, outerColor?: string, innerColor?: string }) => {
  return (
    <div className={`${size} ${outerColor} rounded-full flex items-center justify-center`}>
      <div className={`${size === 'w-12 h-12' ? 'w-6 h-6' : 'w-1/2 h-1/2'} ${innerColor} rounded-full`}></div>
    </div>
  );
};

export default CircleIcon;
