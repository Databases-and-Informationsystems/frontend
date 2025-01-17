import React, { useState } from 'react';

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123456789',
    username: 'john_doe',
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleUpdateInfo = () => {
    const updatedFields = [];
    const noUpdates = Object.keys(userInfo).every((key) => !userInfo[key]);

    if (noUpdates) {
      setUpdateMessage('No updates were made.');
      return;
    }

    // Check which fields were updated
    if (userInfo.name) updatedFields.push('Name');
    if (userInfo.lastName) updatedFields.push('Last Name');
    if (userInfo.email) updatedFields.push('Email');
    if (userInfo.phone) updatedFields.push('Phone');
    if (userInfo.username) updatedFields.push('Username');

    if (updatedFields.length > 0) {
      setUpdateMessage(`${updatedFields.join(', ')} updated successfully.`);
    }

  
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
          <div>
            <label className="block text-sm font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              placeholder={userInfo.name}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleInputChange}
              placeholder={userInfo.lastName}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              placeholder={userInfo.email}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              placeholder={userInfo.phone}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Username:</label>
            <input
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleInputChange}
              placeholder={userInfo.username}
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
      </div>

      {updateMessage && <p className="text-yellow-500 mt-4">{updateMessage}</p>}

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
