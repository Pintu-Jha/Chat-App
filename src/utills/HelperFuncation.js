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
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;
};
