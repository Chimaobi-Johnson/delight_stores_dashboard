import { _mock } from 'src/_mock';
import { useSelector } from 'react-redux';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {

  const userObj = useSelector(data => data.user)


  const user = {
    ...userObj,
    photoURL: _mock.image.avatar(24),
    displayName: `${userObj.firstName} ${userObj.lastName}`,
    isPublic: true,
  };

  return { user };
}
