const getRecipientEmail = (users, user) => users?.filter((userToFilter) => userToFilter !== user?.email)[0];



export default getRecipientEmail;