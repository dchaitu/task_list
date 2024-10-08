import {ThreeDots} from "react-loader-spinner";


const Loader = () => (
        <div className="flex container-fluid justify-center items-center h-screen">
            <ThreeDots
                height="180"
                width="180"
                color="#9AD0E9"
                ariaLabel="loading"
            />
        </div>
    );


export default Loader;