
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/login");
            }
            // Get token from localStorage
            const response = await fetch("http://127.0.0.1:8000/logout/", {
                method: "GET",
                headers: {
                    'Authorization': `Token ${token}`,  // Send token in headers
                }
            });
            // if (token) {
            //     // Optionally: Validate the token with an API call or check expiration
            //     const isValid = await this.validateToken(token);
            //
            //     if (isValid) {
            //         this.props.navigate('/main');  // Redirect to main/dashboard if token is valid
            //     } else {
            //         this.props.navigate('/login');  // If invalid, redirect to login
            //     }
            // } else {
            //     this.props.navigate('/login');  // No token found, redirect to login
            // }
            console.log(token)


            if (response.ok ||token) {
                // Remove the token from localStorage
                localStorage.removeItem('token');

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
