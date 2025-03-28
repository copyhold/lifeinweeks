import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppStore } from '../services/state.zus';
import { TEvent } from '../types';
import { colors } from '../theme';
import { EventModal } from './EventModal';

const EventsListContainer = styled.div`
  background-color: ${colors.background};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
`;

const EventsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${colors.border || '#ccc'};
  padding-bottom: 0.5rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`;

const NewButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  &::before {
    content: '➕';
  }
`;

const StyledEventsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const EventItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${colors.border || '#eee'};
  
  &:last-child {
    border-bottom: none;
  }
`;

const EventDate = styled.span`
  min-width: 100px;
  font-size: 0.9rem;
`;

const EventNote = styled.span`
  flex-grow: 1;
  margin: 0 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
`;

const EditButton = styled(ActionButton)`
  &::before {
    content: '✏️';
  }
`;

const DeleteButton = styled(ActionButton)`
  &::before {
    content: '🗑️';
  }
`;

const NoEventsMessage = styled.p`
  text-align: center;
  color: ${colors.text || '#666'};
  font-style: italic;
`;

export const EventsList: React.FC = () => {
  // Get events and setEvents from the app store
  const appStore = useAppStore();
  const events = appStore.events || [];
  const setEvents = appStore.setEvents;
  
  const [sortedEvents, setSortedEvents] = useState<TEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<TEvent | null>(null);

  React.useEffect(() => {
    if (!events || events.length === 0) {
      setSortedEvents([]);
      return;
    }
    
    // Sort events by date (newest first)
    const sorted = [...events].sort((a, b) => 
      new Date(b.start).getTime() - new Date(a.start).getTime()
    );
    setSortedEvents(sorted);
  }, [events]);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentEvent(null);
    setShowModal(true);
  };

  const openEditModal = (event: TEvent) => {
    setIsEditing(true);
    setCurrentEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentEvent(null);
  };

  const handleModalSubmit = (note: string, date: string) => {
    if (isEditing && currentEvent) {
      // Update existing event
      const updatedEvents = events.map(e => 
        e.id === currentEvent.id 
          ? { ...e, note, start: new Date(date).toISOString() } 
          : e
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent: TEvent = {
        id: Date.now().toString(),
        start: new Date(date).toISOString(),
        note
      };
      setEvents([...events, newEvent]);
    }
    
    closeModal();
  };

  const handleDeleteEvent = (event: TEvent) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    const updatedEvents = events.filter(e => e.id !== event.id);
    setEvents(updatedEvents);
  };

  return (
    <EventsListContainer>
      <EventsHeader>
        <Title>Life Events</Title>
        <NewButton onClick={openAddModal} title="Add new event" />
      </EventsHeader>
      
      {sortedEvents.length > 0 ? (
        <StyledEventsList>
          {sortedEvents.map(event => (
            <EventItem key={event.id}>
              <EventDate>{new Date(event.start).toLocaleDateString()}</EventDate>
              <EventNote>{event.note}</EventNote>
              <ActionButtons>
                <EditButton onClick={() => openEditModal(event)} title="Edit event" />
                <DeleteButton onClick={() => handleDeleteEvent(event)} title="Delete event" />
              </ActionButtons>
            </EventItem>
          ))}
        </StyledEventsList>
      ) : (
        <NoEventsMessage>No events to display</NoEventsMessage>
      )}

      <EventModal
        isOpen={showModal}
        isEditing={isEditing}
        currentEvent={currentEvent}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
    </EventsListContainer>
  );
}; 