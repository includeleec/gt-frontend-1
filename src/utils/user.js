export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

export function setCurrentUser(currentUser) {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

export function removeCurrentUser() {
  localStorage.removeItem('currentUser');
}

export function isCreatorOrAdmin({ currentUser, detail }) {
  if (currentUser && currentUser.admin === true) {
    return true;
  }

  if (detail.creator && detail.creator.id === currentUser.id) {
    return true;
  }

  return false;
}
