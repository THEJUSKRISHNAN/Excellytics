import { logout } from "../../store/auth-slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LogOut} from "lucide-react";



const Header = ({ title }) => {

	const dispatch = useDispatch();
  
	const handleLogout = () => {
	  dispatch(logout());
	};

	return (
		<header className='bg-white bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-200 flex justify-between'>
			<div className='max-w-7xl py-4 px-4 sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-semibold'>{title}</h1>
			</div>

			<button className="flex gap-2 items-center cursor-pointer mr-5" onClick={handleLogout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline font-semibold">Logout</span>
                </button>

		</header>
	);
};
export default Header;