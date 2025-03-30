import React, { useRef } from 'react';
import styled from 'styled-components';
import { TEvent } from '../types';
import { colors } from '../theme';

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${colors.background};
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${colors.border || '#ccc'};
  padding-bottom: 0.5rem;
`;

const ModalTitle = styled.h3`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  &::before {
    content: '✖';
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${colors.border || '#ccc'};
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${colors.border || '#ccc'};
  border-radius: 0.25rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${colors.border || '#ccc'};
  
  &:hover {
    opacity: 0.9;
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${colors.empathize || '#4CAF50'};
  color: white;
`;

interface EventModalProps {
  isOpen: boolean;
  isEditing: boolean;
  currentEvent: TEvent | null;
  onClose: () => void;
  onSubmit: (note: string, date: string) => void;
}

// Format date for input value (YYYY-MM-DD)
const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const EventModal: React.FC<EventModalProps> = ({ isOpen, isEditing, currentEvent, onClose, onSubmit }) => {
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!noteRef.current || !dateRef.current) return;

    const note = noteRef.current.value.trim();
    const date = dateRef.current.value;

    if (!note || !date) return;

    onSubmit(note, date);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{isEditing ? 'Edit Event' : 'Add New Event'}</ModalTitle>
          <CloseButton onClick={onClose} />
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="event-date">Date</Label>
            <Input
              id="event-date"
              type="date"
              ref={dateRef}
              defaultValue={
                currentEvent ? formatDateForInput(currentEvent.start) : formatDateForInput(new Date().toISOString())
              }
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="event-note">Note</Label>
            <TextArea
              id="event-note"
              ref={noteRef}
              defaultValue={currentEvent?.note || ''}
              placeholder="Enter event details..."
              required
            />
          </FormGroup>
          <ButtonGroup>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <SubmitButton type="submit">{isEditing ? 'Update' : 'Add'}</SubmitButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};
