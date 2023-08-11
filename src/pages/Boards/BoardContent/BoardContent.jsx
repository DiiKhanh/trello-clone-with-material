import { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import { DndContext, useSensor, useSensors, MouseSensor,
  TouchSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners,
  pointerWithin, rectIntersection, getFirstCollision, closestCenter
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { cloneDeep } from 'lodash';

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_COLUMN_TYPE',
  CARD: 'ACTIVE_DRAG_ITEM_CARD_TYPE'
};

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

  const lastOverId = useRef(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id).includes(cardId));
  };

  // handle drag drop
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnDraggingCard, setOldColumnDraggingCard] = useState(null);

  const moveCardBetweenColumn = (
    overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId);
      let newCardIndex;
      const isBelowOverItem = active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id);
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id);
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards?.filter(card => card._id !== activeDraggingCardId);
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id);
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId);
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, { ...activeDraggingCardData, columnId: nextOverColumn._id });
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id);
      }
      return nextColumns;
    });
  };

  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN);
    setActiveDragItemData(e?.active?.data?.current);
    if (e?.active?.data?.current?.columnId) {
      setOldColumnDraggingCard(findColumnByCardId(e.active?.id));
    }
  };

  const handleDragOver = (e) => {
    const { active, over } = e;

    if (!active || !over) return;

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
    const { id: overCardId } = over;
    // tim 2 cai column theo card id
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);
    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenColumn(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData);
    }

  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
      const { id: overCardId } = over;
      // tim 2 cai column theo card id
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);
      if (!activeColumn || !overColumn) return;

      if (oldColumnDraggingCard._id !== overColumn._id) {
        moveCardBetweenColumn(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData);
      } else {
        const oldCardIndex = oldColumnDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId);
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId);
        const dndOrderedCards = arrayMove(oldColumnDraggingCard?.cards, oldCardIndex, newCardIndex);

        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns);
          const targetColumn = nextColumns.find(column => column._id === overColumn._id);
          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id);
          return nextColumns;
        });
      }

    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active?.id !== over?.id) {
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id);
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id);
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex);
        // update data when move column
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
        setOrderedColumns(dndOrderedColumns);
      }
    }
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnDraggingCard(null);
  };

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  };

  const collisionDetectionStrategy = useCallback((args) => {

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args });
    }

    const pointerIntersections = pointerWithin(args);
    const intersections = pointerIntersections?.length > 0 ?
      pointerIntersections : rectIntersection(args);

    let overId = getFirstCollision(intersections, 'id');
    if (overId) {
      const checkColumn = orderedColumns.find(c => c._id === overId);
      if (checkColumn) {
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(c => {
            return c.id !== overId && checkColumn?.cardOrderIds.includes(c.id);
          })
        })[0]?.id;
      }
      lastOverId.current = overId;
      return [{ id: overId }];
    }
    return lastOverId.current ? [{ id: lastOverId.current }] : [];
  }, [activeDragItemType, orderedColumns]);

  return (
    <DndContext onDragEnd={handleDragEnd}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      // collisionDetection={closestCorners}
      // fix conflic between 2 colmun
      collisionDetection={collisionDetectionStrategy}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => (theme.trelloCustom.boardContentHeight),
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};

export default BoardContent;