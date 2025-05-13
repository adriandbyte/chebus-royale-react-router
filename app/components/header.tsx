import { Link } from "react-router";

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Placeholder for Logo */}
        <div className="mx-4">
          {/* You can replace this div with your actual Logo component or img tag */}
          <Link to="/" className="text-white">
            <span className="text-xl font-bold ">[Logo]</span>
          </Link>
        </div>
        <div className="mx-4">
          <h1 className="text-xl font-bold">Chebus Royale</h1>
        </div>
      </div>
      <div className="flex items-center">
        {/* Placeholder for User Icon */}
        <div className="mx-4">
          {/* You can replace this div with your actual User Icon component or img tag */}
          <span className="text-xl">[User Icon]</span>
        </div>
      </div>
    </header>
  );
}
export default Header;
