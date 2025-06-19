
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const access = localStorage.getItem("access");
            if (!access) {
                navigate("/login");
            }
            // Get token from localStorage
            const response = await fetch("http://127.0.0.1:8000/logout/", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${access}`,  // Send token in headers
                }
            });
            console.log(access)


            if (response.ok ||access) {
                // Remove the token from localStorage
                localStorage.removeItem('access');

                // Navigate to login page or any other page after logout
                navigate("/login");

                console.log("Logged out successfully");
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    return (
        <button className="w-full" onClick={handleLogout}>
            {props.children}
        </button>
    );
};

export default Logout;
