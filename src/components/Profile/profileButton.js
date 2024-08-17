import {FaUserCircle} from "react-icons/fa";

const ProfileButton = (props) => {
    return(
        <div className="content-end float-right menu">
        <button onClick={props.onClick}>
            <FaUserCircle/>
          {props.children}
        </button>
        </div>
    )

}

export default ProfileButton
