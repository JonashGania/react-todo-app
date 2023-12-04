export default function useGetUserInfo() {
  const { name, profilePhoto } = JSON.parse(localStorage.getItem('auth')) || {};
  
  return { name, profilePhoto };
}
