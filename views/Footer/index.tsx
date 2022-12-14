import BottomNavigation from '@mui/material/BottomNavigation';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <BottomNavigation sx={{ mt: 2 }}>
      <p>© {currentYear} WorkDB</p>
    </BottomNavigation>
  );
};
