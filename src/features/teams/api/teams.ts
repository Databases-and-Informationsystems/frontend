import axiosInstance from '@/lib/axios'

export const getTeams = async () => {
  const response = await axiosInstance.get('/teams/')
  return response.data
}

export const createTeam = async (name: string) => {
  const response = await axiosInstance.post('/teams/', { name })
  return response.data
}

export const addMemberToTeam = async (teamId: number, userMail: string) => {
  const response = await axiosInstance.post('/teams/members', {
    team_id: teamId,
    user_mail: userMail,
  })
  return response.data
}

export const deleteMemberFromTeam = async (
  teamId: number,
  userMail: string
) => {
  const response = await axiosInstance.delete('/teams/members', {
    data: { team_id: teamId, user_mail: userMail },
  })
  return response.data
}
