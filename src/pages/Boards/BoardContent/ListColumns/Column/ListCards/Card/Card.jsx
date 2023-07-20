import { Button, Typography, Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachMentIcon from '@mui/icons-material/Attachment';


const Card = ({ hiddenMedia }) => {

  if (hiddenMedia) {
    return (
      <MuiCard
        style={{ overflow: 'unset' }}
        sx={{ cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0,0,0,0.2'
        }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Card 01</Typography>
        </CardContent>
      </MuiCard>
    );
  }

  return (
    <MuiCard
      style={{ overflow: 'unset' }}
      sx={{ cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2'
      }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://picsum.photos/id/237/200/300"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography> Duy Khanh </Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon/>}>20</Button>
        <Button size="small" startIcon={<CommentIcon/>}>15</Button>
        <Button size="small" startIcon={<AttachMentIcon/>}>10</Button>
      </CardActions>
    </MuiCard>
  );
};

export default Card;