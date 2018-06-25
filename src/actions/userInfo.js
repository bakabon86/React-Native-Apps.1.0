export const getuserinfo = (token,status,nik,nama) => {
    return{
      type:'GETUSERINFO',
      token: token,
      status: status,
      nik:nik,
      username:nama,
    };
  };