import ModeSelect from '../ModeSelect';
import { Box, SvgIcon, Typography, Button, TextField, Badge, Tooltip } from '@mui/material';
import { Apps } from '@mui/icons-material';
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg';
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profiles from './Menus/Profiles';

const AppBar = () => {
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto'
    }}>
      {/* left */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <Apps sx={{ color: 'primary.main' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} >
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }}/>
          <Typography variant='span'
            sx={{ fontSize:'1.2rem', color: 'primary.main', fontWeight: 'bold' }} >Trello</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred/>
          <Templates/>
        </Box>

        <Button variant='outlined'>
          Create
        </Button>
      </Box>
      {/* right */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField type='search' size='small' label='Search ...' id='outlined-search'
          sx={{ minWidth: '120px' }}
        />
        <ModeSelect/>
        <Tooltip title='Notification'>
          <Badge color="secondary" variant='dot' sx={{ cursor: 'pointer' }} >
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{ color: 'primary.main' }} />
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  );
};

export default AppBar;