import React, { useState } from 'react';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleUpdateInfo = () => {
    console.log('Updating user info:', userInfo);
    setSuccessMessage('User information updated successfully.');
  };

  const handleChangePassword = () => {
    const { oldPassword, newPassword, confirmNewPassword } = passwords;

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (!oldPassword || !newPassword) {
      setError('All password fields are required.');
      return;
    }

    console.log('Changing password:', { oldPassword, newPassword });
    setSuccessMessage('Password changed successfully.');
    setError('');
    setPasswords({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  return (
    <div className="settings-page flex flex-col items-center p-4">
      <h2 className="text-4xl font-bold mb-6">Settings</h2>

      {/* Update User Info */}
      <div className="w-full max-w-md mb-10">
        <h3 className="text-xl font-semibold mb-4">Update Your Information</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="First Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="border p-2 rounded"
          />
          <button
            onClick={handleUpdateInfo}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Information
          </button>
        </div>
      </div>

      <hr className="w-full max-w-md border-gray-300" />

      {/* Change Password */}
      <div className="w-full max-w-md mt-10">
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
  );
};

export default Settings;
