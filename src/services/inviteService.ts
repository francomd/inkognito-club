const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getInvites = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const response = await fetch(`${API_URL}/user/invite`, { cache: "no-cache" });

  return response.json();
};

// const inviteUser = async (email: string) => {
//   const response = await fetch(`${API_URL}/user/invite`, {
//     method: "POST",
//     body: JSON.stringify(email)
//   });

//   if (response.status === 200) {
//     mutate(`${API_URL}/user/invite`);
//   } else {
//     console.log(response);
//   }
// };

export const InviteService = { getInvites };
