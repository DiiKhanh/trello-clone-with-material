import { useState } from 'react';
import { Box, SvgIcon, Typography, Button, TextField, Badge, Tooltip } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg';
import ModeSelect from '../ModeSelect';
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Profiles from './Menus/Profiles';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const AppBar = () => {

  const [searchValue, setSearchValue] = useState('');

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
    }}>
      {/* left */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'white' }}/>
          <Typography variant='span'
            sx={{ fontSize:'1.2rem', color: 'white', fontWeight: 'bold' }} >Trello</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred/>
          <Templates/>
        </Box>

        <Button
          sx={{ color: 'white', border: 'none',
            '&:hover': {
              border: 'none'
            }
          }}
          variant='outlined' startIcon={<LibraryAddIcon/>} >
          Create
        </Button>
      </Box>
      {/* right */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField type='text' size='small' label='Search ...' id='outlined-search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize='small'
                sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                onClick = {() => setSearchValue('')}
              />
            )
          }}
        />
        <ModeSelect/>
        <Tooltip title='Notification'>
          <Badge color="warning" variant='dot' sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{ color: 'white' }}/>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  );
};

export default AppBar;