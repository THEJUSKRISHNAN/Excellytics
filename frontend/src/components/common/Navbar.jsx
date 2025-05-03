import { Link } from "react-router-dom";
import { FileChartColumnIncreasing } from "lucide-react";

const Navbar = () => {

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg ">

      <div className="container mx-auto px-4 h-16 lg:h-20">

        <div className="flex items-center justify-between h-full">

          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileChartColumnIncreasing className="w-7 h-7 text-green-500 hover:text-green-700" />
              </div>
              <h1 className="text-lg lg:text-3xl font-bold">Excellytics</h1>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};
export default Navbar;
