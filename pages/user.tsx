import dynamic from "next/dynamic";

const UserPage = dynamic(() => import("../components/pages/UserPage"), {
  ssr: false,
});

export default UserPage;