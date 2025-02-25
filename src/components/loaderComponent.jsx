const LoaderComponent = ({ title }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 border-2 border-white border-t-2 border-t-blue-500 rounded-full animate-spin"></div>
      <span>{title}</span>
    </div>
  );
};
export default LoaderComponent;
