import LoginButton from "../login/LoginButton";
import ProfileDetails from "./ProfileDetails";

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile</h1>
      <ProfileDetails />
      <LoginButton />
    </div>
  );
}

export default ProfilePage;