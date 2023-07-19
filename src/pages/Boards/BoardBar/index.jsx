import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AvatarGroup from '@mui/material/AvatarGroup';
import DashBoardIcon from '@mui/icons-material/DashBoard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// style for component Chip
const CHIP_STYLES = {
  color: 'primary.main',
  borderRadius: '4px',
  paddingX: '5px',
  bgcolor: 'white',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover':{
    bgcolor: 'primary.50'
  }
};

const BoardBar = () => {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      borderTop: '1px solid #00bfa5'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={CHIP_STYLES}
          icon={<DashBoardIcon />} label="DuyKhanh Workspace" clickable
        />
        <Chip
          sx={CHIP_STYLES}
          icon={<VpnLockIcon />} label="Public/Private" clickable
        />
        <Chip
          sx={CHIP_STYLES}
          icon={<AddToDriveIcon />} label="Add to Google Drive" clickable
        />
        <Chip
          sx={CHIP_STYLES}
          icon={<BoltIcon />} label="Automatic" clickable
        />
        <Chip
          sx={CHIP_STYLES}
          icon={<FilterListIcon />} label="Filters" clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant='outlined' startIcon={<PersonAddIcon/>} >
          Invite
        </Button>

        <AvatarGroup max={7}
          sx={{
            '& .MuiAvatar-root':{
              width: 34,
              height: 34,
              fontSize: 16
            }
          }}
        >
          <Tooltip title='User' >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='User' >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='User' >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='User' >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='User' >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='User' >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='User' >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title='User' >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;