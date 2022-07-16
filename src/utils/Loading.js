import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Loading = (props) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [location]);

  return (
    <>
      {loading && (
        <div className="loading-container">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
          <p className="content">Loading . . .</p>
        </div>
      )}
      {!loading && props.children}
    </>
  );
};

export default Loading;
