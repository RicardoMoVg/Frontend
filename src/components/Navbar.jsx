import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/auth';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, [location]); // Re-check auth on route change

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-fifa-blue text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Brand */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold tracking-wider">
                            MUNDIAL <span className="text-fifa-yellow">2026</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                <NavLink to="/" active={isActive('/')}>Inicio</NavLink>
                                <NavLink to="/chat" active={isActive('/chat')}>Chat</NavLink>
                                <NavLink to="/matches" active={isActive('/matches')}>Partidos</NavLink>
                                <NavLink to="/tournaments" active={isActive('/tournaments')}>Torneos</NavLink>
                                <NavLink to="/teams" active={isActive('/teams')}>Equipos</NavLink>

                                <div className="relative group">
                                    <button className="flex items-center space-x-1 hover:text-fifa-yellow transition">
                                        <span className="font-medium">{user.username}</span>
                                        <i className="fas fa-chevron-down text-xs"></i>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 hidden group-hover:block">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mi Perfil</Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-fifa-yellow transition">Iniciar Sesión</Link>
                                <Link to="/register" className="bg-fifa-yellow text-fifa-blue px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition">
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-fifa-yellow focus:outline-none"
                        >
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-800 px-4 pt-2 pb-4 space-y-2">
                    {user ? (
                        <>
                            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Inicio</MobileNavLink>
                            <MobileNavLink to="/chat" onClick={() => setIsMenuOpen(false)}>Chat</MobileNavLink>
                            <MobileNavLink to="/matches" onClick={() => setIsMenuOpen(false)}>Partidos</MobileNavLink>
                            <MobileNavLink to="/tournaments" onClick={() => setIsMenuOpen(false)}>Torneos</MobileNavLink>
                            <MobileNavLink to="/teams" onClick={() => setIsMenuOpen(false)}>Equipos</MobileNavLink>
                            <MobileNavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Mi Perfil</MobileNavLink>
                            <button
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="block w-full text-left px-3 py-2 text-red-300 hover:text-white hover:bg-blue-700 rounded-md"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <MobileNavLink to="/login" onClick={() => setIsMenuOpen(false)}>Iniciar Sesión</MobileNavLink>
                            <MobileNavLink to="/register" onClick={() => setIsMenuOpen(false)}>Registrarse</MobileNavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

const NavLink = ({ to, children, active }) => (
    <Link
        to={to}
        className={`font-medium transition duration-200 ${active ? 'text-fifa-yellow border-b-2 border-fifa-yellow' : 'hover:text-fifa-yellow'}`}
    >
        {children}
    </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white transition"
    >
        {children}
    </Link>
);

export default Navbar;
