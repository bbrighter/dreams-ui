import { useNavigate } from 'react-router-dom';

export const useNavigateHomePage = () => {
    const navigate = useNavigate()
    return () => navigate('/')
}

export const useNavigateToDream = () => {
    const navigate = useNavigate()
    return (dreamId: number) => navigate('/dreams/' + dreamId)
}

export const useNavigateStatistics = () => {
    const navigate = useNavigate()
    return () => navigate('/statistics')
}

export const useNavigateToManagement = () => {
    const navigate = useNavigate()
    return () => navigate('/management')
}