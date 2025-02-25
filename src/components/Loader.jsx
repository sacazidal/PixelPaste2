const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-950 bg-opacity-60 z-50">
      <div className="w-14 h-14 border-t-4 border-t-black dark:border-t-white rounded-full animate-spin" />
    </div>
  );
};
export default Loader;
