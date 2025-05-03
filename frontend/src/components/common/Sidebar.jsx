import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {LayoutDashboard,Upload,History,User, Menu,} from "lucide-react";

const SIDEBAR_ITEMS = [
    { name: "Dashboard", icon: LayoutDashboard , href: "/dashboard" },
    { name: "Upload", icon: Upload , href: "/excelupload" },
    { name: "History", icon: History , href: "/history" },
    { name: "Profile", icon: User , href: "/profile" },
]

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);


	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-60" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-white bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-200'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-green-400 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href} onClick={(e)=>e.ProgressEvent.default}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-green-400 transition-colors mb-2'>
								<item.icon size={20} style={{ minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.4 }}
										>
											<p className="font-semibold text-xl">{item.name}</p>
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};
export default Sidebar;