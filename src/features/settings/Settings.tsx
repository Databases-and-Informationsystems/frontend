import { useState } from 'react'

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

  const handleUpdateInfo = () => {
    const updatedFields = []
    const noUpdates = Object.keys(userInfo).every((key) => !userInfo[key])

    if (noUpdates) {
      setUpdateMessage('No updates were made.')
      return
    }

    if (userInfo.email) updatedFields.push('Email')
    if (userInfo.username) updatedFields.push('Username')

    if (updatedFields.length > 0) {
      setUpdateMessage(`${updatedFields.join(', ')} updated successfully.`)
    }
  }

  const handleChangePassword = () => {
    const { oldPassword, newPassword, confirmNewPassword } = passwords

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    if (!oldPassword || !newPassword) {
      setError('All password fields are required.')
      return
    }

    console.log('Changing password:', { oldPassword, newPassword })
    setSuccessMessage('Password changed successfully.')
    setError('')
    setPasswords({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-4xl font-bold mb-6">Settings</h2>

      {/* Container for sections */}
      <div className="w-full flex flex-col lg:flex-row lg:gap-16 gap-10 items-stretch">
        {/* Update User Info */}
        <div className="flex-1 flex flex-col bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Update Your Information
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
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
            <div className="flex flex-col">
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
          {updateMessage && (
            <p className="text-yellow-500 mt-4">{updateMessage}</p>
          )}
        </div>

        {/* Change Password */}
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
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
