import { Helmet } from 'react-helmet-async';
// sections
import { JwtLoginView } from 'src/sections/auth/jwt';
import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'src/routes/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import { storeLoggedInUser } from 'src/store/actions/user';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    const getUser = () => {
      axios
        .get('/api/current_user')
        .then((data) => {
          console.log(data);
          if (!data.data.user) return;
          dispatch(storeLoggedInUser(data.data.user));
          router.push(PATH_AFTER_LOGIN)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser();
  }, [dispatch, router]);

  return (
    <>
      <Helmet>
        <title> Jwt: Login</title>
      </Helmet>

      <JwtLoginView />
    </>
  );
}
