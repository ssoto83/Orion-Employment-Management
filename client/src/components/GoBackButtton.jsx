import { useLocation, useNavigate } from 'react-router-dom';

const GoBackButton  = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">        {location.pathname !== '/' && (
          <Box>
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
            >
            &larr; Go Back
          </button>
        )}