
export const SELECT_EXTENSION = 'SELECT_EXTENSION';
export const CHANGE_IMAGE = 'CHANGE_IMAGE';

export function selectExtension(data) {
  return {
    type: SELECT_EXTENSION,
    payload: data
  };
}

export function selectImage(data) {
  return {
    type: CHANGE_IMAGE,
    payload: data
  };
}