import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
//
// import { useAuthContext } from '../hooks';
import { storeLoggedInUser } from 'src/store/actions/user';
import { useDispatch } from 'react-redux';
// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.jwt.login,
};

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = () => {
      axios.get('/api/current_user')
      .then(data => {
        if(!data.data.user) {
          console.log('user not found')
          router.push(`${loginPaths.jwt}?status=login`);
        }
        dispatch(storeLoggedInUser(data.data.user))
      })
      .catch(err => {
        console.log(err)
      })
    }

    getUser()
  }, [dispatch, router]);

  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};
