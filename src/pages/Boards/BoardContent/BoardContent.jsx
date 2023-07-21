import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor,
  TouchSensor
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

const BoardContent = ({ board }) => {
  // sensor
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 }
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  // state
  const [orderedColumns, setOrderedColumns] = useState([]);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
  }, [board]);

  const handleDragEnd = (e) => {
    console.log(e);
    const { active, over } = e;

    if (!over) return;

    if (active?.id !== over?.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id);
      const newIndex = orderedColumns.findIndex(c => c._id === over.id);
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // update data when move column
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
      setOrderedColumns(dndOrderedColumns);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => (theme.trelloCustom.boardContentHeight),
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>
  );
};

export default BoardContent;