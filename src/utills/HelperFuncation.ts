import {showMessage} from 'react-native-flash-message';
import NavigationService from '../NavigationServies';

export const showError = (message: string) => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
    duration: 2500,
  });
};

export const showSucess = (message: string) => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
    duration: 2500,
  });
};

export const formatTimestamp = (timestamp: Date) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;
};

const participantColors : Record<string,any> = {};

export const getColorForParticipant = (participantId: string) => {
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

//NAVIGATION FUNCTIONS
export const navigate = (routeName: string, params?: Record<string, any>) => {
  NavigationService.navigate(routeName, params);
};

export const replace = (routeName: string, params?: Record<string, any>) => {
  NavigationService.replace(routeName, params);
};

export const goBack = () => {
  NavigationService.back();
};

export const openDrawer = () => {
  NavigationService.openDrawer();
};

export const closeDrawer = () => {
  NavigationService.closeDrawer();
};

export const clearStack = (routeName: string, params = {}) => {
  NavigationService.clearStack(routeName, params);
};

export const push = (routeName: string, params = {}) => {
  NavigationService.push(routeName, params);
};
