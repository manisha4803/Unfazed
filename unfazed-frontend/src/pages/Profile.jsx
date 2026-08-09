import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/profile.css";

function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/therapist/profile");
      if (res.data.therapist) {
        const t = res.data.therapist;
        setProfile({
          name: t.name || "",
          email: t.email || "",
          specialization: t.specialization || "",
          experience: t.experience || "",
          phone: t.phone || "",
          bio: t.bio || "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put("/therapist/profile", profile);

      alert("Profile Updated Successfully");

    } catch (err) {
      alert(err.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="profile-page">

      <h1>My Profile</h1>

      <form className="profile-form" onSubmit={handleSubmit}>

        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <input
          name="email"
          value={profile.email}
          readOnly
        />

        <input
          name="specialization"
          value={profile.specialization}
          onChange={handleChange}
          placeholder="Specialization"
        />

        <input
          name="experience"
          value={profile.experience}
          onChange={handleChange}
          placeholder="Experience"
        />

        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <textarea
          rows="5"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Write about yourself..."
        />

        <button>
          Save Changes
        </button>

      </form>

    </div>
  );
}

export default Profile;