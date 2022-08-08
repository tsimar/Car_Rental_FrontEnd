import React from "react";

export const getUser = () => {
  const fetchDATAEmpl = async () => {
    const getEmpl = apiEmpl.get(`/${addCompanyId}`);
    axios.all([getEmpl]).then(
      axios.spread((...allData) => {
        setLoadingEmpl(true);
        const getEmplAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getEmplAll" + getEmplAll.data);
        setPostsEmpl(getEmplAll.data);
        setLoadingEmpl(false);
      })
    );
  };
  return <></>;
};
// export default getUser;
