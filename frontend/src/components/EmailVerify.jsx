import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EmailVerify() {
  const params = useParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (verified) return;

        const res = await fetch(
          `http://localhost:3000/api/users/${params.id}/verify/${params.token}`,
          {
            credentials: "include",
          }
        );

        const resData = await res.json();

        console.log(resData);

        toast.success(resData.message);
        setVerified(true);
        navigate("/login");
      } catch (error) {
        toast.error(err?.data?.message || err.error);
      }
    };

    verifyEmail();
  }, [params, verified]);

  return <div>EmailVerify</div>;
}

export default EmailVerify;
