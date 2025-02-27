import { useNavigate } from "react-router-dom";

const CapturedButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/captured")}>
      Ver Pokémon Capturados
    </button>
  );
};

export default CapturedButton;