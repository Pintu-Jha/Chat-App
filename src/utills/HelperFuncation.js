import {showMessage} from 'react-native-flash-message';

export const showError = message => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
    duration: 2500,
  });
};

export const showSucess = message => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
    duration: 2500,
  });
};

export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;
};

const participantColors = {};

export const getColorForParticipant = participantId => {
  if (!participantColors[participantId]) {
    const hash = participantId
      .split('')
      .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const hue = hash % 360;
    const isBright = hash % 2 === 0;
    const saturation = isBright ? 70 : 50;
    const lightness = isBright ? 70 : 40;
    participantColors[
      participantId
    ] = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  return participantColors[participantId];
};
