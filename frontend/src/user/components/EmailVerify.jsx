import { useEffect, useState } from "react";
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

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${params.id}/verify/${
            params.token
          }`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        toast.success(data.message);
        setVerified(true);
        navigate("/login", { replace: true });
      } catch (error) {
        toast.error(error?.message);
      }
    };

    verifyEmail();
  }, [params, verified]);
}

export default EmailVerify;
