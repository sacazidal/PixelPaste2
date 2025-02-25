const Feature = ({ className, title }) => {
  return (
    <div
      className={`rounded-xl dark:bg-neutral-600 border md:border-2 border-neutral-600 px-2 py-1 ${className}`}
    >
      {title}
    </div>
  );
};
export default Feature;
