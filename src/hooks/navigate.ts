import { useNavigate } from "react-router-dom";

export function useNavigateHomePage() {
    const navigate = useNavigate()
    return () => navigate('/')
}