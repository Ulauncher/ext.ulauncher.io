import { createSelector } from 'reselect'

export const auth0Session = state => state.auth0.session
export const isLoggedIn = createSelector(auth0Session, session => session && !!session.user)
export const getGithubName = createSelector(
  auth0Session,
  session => session && session.user && session.user.nickname
)
