import React, { useEffect, useState } from "react";

const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Unauthorized! Please log in.");
    throw new Error("Unauthorized");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`http://localhost:5001/api${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Something went wrong");
  }

  return response.json();
};

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<
    { id: number; name: string; members: { email: string; username: string }[] }[]
  >([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);

  const [newMemberEmail, setNewMemberEmail] = useState("");

  // Fetch Teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await apiFetch("/teams/");
        setTeams(data.teams);
      } catch (err: any) {
        setError(err.message || "Failed to fetch teams.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Create a new team
  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) {
      alert("Please enter a team name.");
      return;
    }

    try {
      const data = await apiFetch("/teams/", {
        method: "POST",
        body: JSON.stringify({ name: newTeamName }),
      });

      setTeams((prev) => [
        ...prev,
        { id: data.id, name: newTeamName, members: [] },
      ]);

      setNewTeamName("");
    } catch (err: any) {
      alert(err.message || "Failed to create team.");
    }
  };

  // Add a member to the team
  const handleAddMember = async (teamId: number) => {
    if (!newMemberEmail.trim()) {
      alert("Please enter an email.");
      return;
    }

    try {
      const data = await apiFetch("/teams/members", {
        method: "POST",
        body: JSON.stringify({ user_mail: newMemberEmail, team_id: teamId }),
      });

      setTeams((prev) =>
        prev.map((team) =>
          team.id === teamId
            ? {
              ...team,
              members: [...team.members, { email: data.email, username: data.username }],
            }
            : team
        )
      );

      setNewMemberEmail("");
    } catch (err: any) {
      alert(err.message || "Failed to add member.");
    }
  };

  // Delete a member from the team
  const handleDeleteMember = async (teamId: number, userMail: string) => {
    try {
      await apiFetch("/teams/members", {
        method: "DELETE",
        body: JSON.stringify({ user_mail: userMail, team_id: teamId }),
      });

      setTeams((prev) =>
        prev.map((team) =>
          team.id === teamId
            ? {
              ...team,
              members: team.members.filter((member) => member.email !== userMail),
            }
            : team
        )
      );
    } catch (err: any) {
      alert(err.message || "Failed to delete member.");
    }
  };

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">Teams</h1>

      {/* Input for creating a new team */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter team name"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleCreateTeam}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Team
        </button>
      </div>

      {/* List of teams */}
      <div className="fle gap-6">
        {teams.map((team) => (
          <div key={team.id} className="border p-4 rounded shadow w-full">
            <h2 className="text-lg font-semibold mb-2">{team.name}</h2>

            {editingTeamId === team.id ? (
              <>
                <ul>
                  {team.members.map((member) => (
                    <li key={member.email} className="flex justify-between items-center">
                      <span>{member.username} ({member.email})</span>
                      <button
                        onClick={() => handleDeleteMember(team.id, member.email)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Input for adding a new member */}
                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="Enter member's email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                  <button
                    onClick={() => handleAddMember(team.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
                  >
                    Add Member
                  </button>
                </div>

                <button
                  onClick={() => setEditingTeamId(null)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <ul>
                  {team.members.map((member) => (
                    <li key={member.email}>
                      {member.username} ({member.email})
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setEditingTeamId(team.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
