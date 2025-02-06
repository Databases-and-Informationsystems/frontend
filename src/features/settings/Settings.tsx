import { useState } from 'react'
import axios from 'axios'

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
  })
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [updateMessage, setUpdateMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswords({ ...passwords, [name]: value })
  }

  const handleUpdateInfo = async () => {
    const { email, username } = userInfo;
  
    // Check if there's actually any data to update
    if (!email && !username) {
      setUpdateMessage("No updates were made.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch("http://localhost:5001/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, username }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }
  
      setUpdateMessage("Profile updated successfully.");
      setError("");
  
      // Clear input fields after successful update
      setUserInfo({ email: "", username: "" });
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      setError(error.message);
    }
  };
  
  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmNewPassword } = passwords;
  
    if (newPassword !== confirmNewPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
  
    if (!oldPassword || !newPassword) {
      setError("All password fields are required.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  

  
      const response = await fetch("http://localhost:5001/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          password: newPassword,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update password.");
      }
  
  
      setSuccessMessage("Password changed successfully.");
      setError("");
      setPasswords({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (error: any) {
      console.error("Error updating password:", error.message);
      setError(error.message);
    }
  };
  
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-4xl font-bold mb-6">Settings</h2>

      <div className="w-full flex flex-col lg:flex-row lg:gap-16 gap-10 items-stretch">
        <div className="flex-1 flex flex-col bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Update Your Information</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="block text-sm font-semibold">Email:</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                placeholder="Enter new email"
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-semibold">Username:</label>
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleInputChange}
                placeholder="Enter new username"
                className="border p-2 rounded"
              />
            </div>
            <button
              onClick={handleUpdateInfo}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Information
            </button>
          </div>
          {updateMessage && <p className="text-yellow-500 mt-4">{updateMessage}</p>}
        </div>

        <div className="flex-1 flex flex-col bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <div className="flex flex-col gap-4">
            <input
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Old Password"
              className="border p-2 rounded"
            />
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="border p-2 rounded"
            />
            <input
              type="password"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm New Password"
              className="border p-2 rounded"
            />
            <button
              onClick={handleChangePassword}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Change Password
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </div>
      </div>
    </div>
  )
}

export default Settings
