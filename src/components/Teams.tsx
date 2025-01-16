import React, { useState } from "react";

// TeamInfo Component: Displays the details of a specific team
const TeamInfo: React.FC<{
  team: { name: string; members: string[] };
  onEditTeam: (teamName: string) => void;
  onRemoveTeam: (teamName: string) => void; // New prop to remove the team
}> = ({ team, onEditTeam, onRemoveTeam }) => (
  <div className="border p-4 rounded shadow w-full">
    <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
    <p className="text-sm text-gray-600 mb-4">
      Invite your team members to collaborate.
    </p>
    <ul>
      {team.members.map((member, idx) => (
        <li key={idx} className="flex items-center space-x-2 mb-2">
          <span>😊</span>
          <div>
            <p>{member}</p>
          </div>
        </li>
      ))}
    </ul>
    <button
      onClick={() => onEditTeam(team.name)}
      className="bg-black text-white px-4 py-2 rounded mt-4 hover:bg-gray-800"
    >
      Edit Team
    </button>
    {/* Remove Team button */}
    <button
      onClick={() => onRemoveTeam(team.name)} // Calling the remove function
      className="bg-red-600 text-white px-4 py-2 rounded mt-4 ml-6 hover:bg-red-800"
      >
      Remove Team
    </button>
  </div>
);

// CreateTeamForm Component: Form to create a new team
const CreateTeamForm: React.FC<{ onCreateTeam: (team: string) => void }> = ({
  onCreateTeam,
}) => {
  const [teamName, setTeamName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      onCreateTeam(teamName);
      setTeamName("");
    }
  };

  return (
    <div className="border p-4 rounded shadow w-full sm:w-1/3">
      <h2 className="text-lg font-semibold mb-2">Create a Team</h2>
      <p className="text-sm text-gray-600 mb-4">
        Create a team to collaborate on projects, annotate documents, compare
        results, and collect them into a dataset.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Team Name"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
        >
          Create
        </button>
      </form>
    </div>
  );
};

// EditTeamForm Component: Form to add/remove team members
const EditTeamForm: React.FC<{
  teamName: string;
  members: string[];
  onUpdateMembers: (members: string[]) => void;
}> = ({ teamName, members, onUpdateMembers }) => {
  const [newMember, setNewMember] = useState("");
  const [updatedMembers, setUpdatedMembers] = useState(members);

  const handleAddMember = () => {
    if (newMember.trim()) {
      setUpdatedMembers((prevMembers) => [...prevMembers, newMember]);
      setNewMember("");
    }
  };

  const handleRemoveMember = (member: string) => {
    setUpdatedMembers((prevMembers) =>
      prevMembers.filter((m) => m !== member)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMembers(updatedMembers);
  };

  return (
    <div className="border p-4 rounded shadow w-full">
      <h2 className="text-lg font-semibold mb-2">{teamName} - Edit Team</h2>
      <p className="text-sm text-gray-600 mb-4">Manage team members</p>
      <ul>
        {updatedMembers.map((member, idx) => (
          <li key={idx} className="flex items-center justify-between mb-2">
            <span>{member}</span>
            <button
              onClick={() => handleRemoveMember(member)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Add new member"
      />
      <button
        onClick={handleAddMember}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
      >
        Add Member
      </button>
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Save Changes
      </button>
    </div>
  );
};

// Main Teams Component
const Teams: React.FC = () => {
  const [teams, setTeams] = useState([
    {
      name: "Annotation Team",
      members: ["Jannic Hermann", "Hans Peter", "Max Mustermann"],
    },
  ]);
  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [updatedMembers, setUpdatedMembers] = useState<string[]>([]);

  const handleCreateTeam = (newTeam: string) => {
    setTeams((prev) => [
      ...prev,
      { name: newTeam, members: [] },
    ]);
  };

  const handleEditTeam = (teamName: string) => {
    setEditingTeam(teamName);
  };

  const handleUpdateMembers = (members: string[]) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.name === editingTeam ? { ...team, members } : team
      )
    );
    setEditingTeam(null); // Exit edit mode
  };

  // Function to handle the removal of a team
  const handleRemoveTeam = (teamName: string) => {
    setTeams((prev) => prev.filter((team) => team.name !== teamName));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">Teams</h1>

      {/* Flex container for teams and the create team form */}
      <div className="flex flex-wrap gap-6">
        {/* Create Team Form */}
        <CreateTeamForm onCreateTeam={handleCreateTeam} />

        {/* Team Info */}
        {teams.map((team, idx) => (
          <div key={idx} className="w-full sm:w-1/3">
            {editingTeam === team.name ? (
              <EditTeamForm
                teamName={team.name}
                members={team.members}
                onUpdateMembers={handleUpdateMembers}
              />
            ) : (
              <TeamInfo
                team={team}
                onEditTeam={handleEditTeam}
                onRemoveTeam={handleRemoveTeam} // Passing the remove function
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;