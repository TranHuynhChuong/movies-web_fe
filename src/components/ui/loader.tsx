export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center rounded-lg bg-gray-50/70">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 rounded-full border-x-gray-400 animate-spin animate-ease-in-out" />
        <div className="absolute border-4 rounded-full inset-2 border-x-gray-400 animate-spin animate-ease-in-out" />
      </div>
    </div>
  );
}
