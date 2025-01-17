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

  if (response.status === 401) {
    alert("Unauthorized! Please log in.");
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Something went wrong");
  }

  return response.json();
};

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<
    { id: number; name: string; members: { username: string }[] }[]
  >([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="flex flex-wrap gap-6">
        {teams.map((team) => (
          <div key={team.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
            <ul>
              {team.members.map((member, idx) => (
                <li key={idx}>{member.username}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
