import { useColorScheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LightMode, DarkModeOutlined, SettingsBrightness } from '@mui/icons-material';
import { Box } from '@mui/material';


const ModeSelect = () => {
  const { mode, setMode } = useColorScheme();
  const handleChange = (e) => {
    const selectedMode = e.target.value;
    setMode(selectedMode);
  };

  return (
    <FormControl size="small" sx={{ minWidth: '120px' }} >
      <InputLabel id="label-mode-select-light-dark"
        sx={{ color: 'white',
          '&.Mui-focused': { color: 'white' }
        }}
      >Mode</InputLabel>
      <Select
        labelId="label-mode-select-light-dark"
        id="mode-select"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '.MuiSvgIcon-root': {
            color: 'white'
          }
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightMode fontSize='small' /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlined fontSize='small' /> Dark
          </Box></MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightness fontSize='small' /> System
          </Box></MenuItem>
      </Select>
    </FormControl>
  );
};


export default ModeSelect;