// export const setAutoLogout = milliseconds => {
//     setTimeout(() => {
//       this.logoutHandler()
//     }, milliseconds)
//   }

//  export const logoutHandler = () => {
//     localStorage.removeItem('googleId');
//     this.props.storeLoginData({
//       isAuth: false
//     })
//     this.props.history.push('/api/logout');
//   };