import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Column from './Column/Column';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const ListColumns = () => {
  return (
    <Box sx={{
      bgcolor: 'inherit',
      height: '100%',
      width: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      {/* Column */}
      <Column />
      <Column />

      {/* button add column */}
      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        bgcolor: '#ffffff3d',
        height: 'fit-content',
        mx: 2,
        borderRadius: '6px'
      }}>
        <Button startIcon={<NoteAddIcon/>}
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1
          }}
        >Add new column</Button>
      </Box>
    </Box>
  );
};

export default ListColumns;