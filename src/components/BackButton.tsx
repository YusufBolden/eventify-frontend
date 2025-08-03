import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // paths to exclude from showing back button
  const excludedPaths = [
    "/",
    "/login",
    "/register",
    "/admin/login",
  ];

  const currentPath = location.pathname;

  // won't show on event detail pages
  if (currentPath.startsWith("/events/")) return null;

  // won't show on excluded pages
  if (excludedPaths.includes(currentPath)) return null;

  return (
    <div className="bg-[#E9D5FF] px-4 pt-2">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-indigo-600 font-semibold hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default BackButton;
