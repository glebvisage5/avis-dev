import style from './Navigate.module.css'
import Logo from '/logo.png'
import LoginBg from '/LoginBg.svg'
import Chervak from '/Chervak.svg'
import BackLatex from '/BackLatex.svg'
import Profile from '/Profile.svg'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navigate(){

    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/recover';
    const isServiceLatex = location.pathname === '/service/latex';
    const isProfile = location.pathname === '/profile';

    return(
        <>
            {isLoginOrRegister && (
                <>
                    <img className={style.LoginBg} src={LoginBg} />
                    <img className={style.Chervak} src={Chervak} />
                </>
            )}
            {isServiceLatex && (
                <>
                    <img className={style.BackLatex} src={BackLatex} />
                </>
            )}
            {isProfile && (
                <>
                    <img className={style.Profile} src={Profile} />
                </>
            )}
            <section 
                className={style.Navigate} 
                style={{
                    boxShadow: isLoginOrRegister || isServiceLatex || isProfile ? '0 0.21vw 0.21vw 0 rgba(0, 0, 0, 0.25)' : 'none',
                    position: isLoginOrRegister || isServiceLatex || isProfile ? 'absolute' : 'none',
                    left: isLoginOrRegister || isServiceLatex || isProfile ? '0' : 'none',
                    top: isLoginOrRegister || isServiceLatex || isProfile ? '0' : 'none',
                }}
            >
                <a href="/">
                    <div className={style.Logo} style={{marginLeft: isLoginOrRegister ? '5.3vw': 'none'}}>
                        <img className={style.LogoImg} src={Logo} />
                        <p className={style.LogoP}>Avis</p>
                    </div>
                </a>
                <div className={style.Navigation}>
                    <a href="/">Главная</a>
                    <a href="">Проекты</a>
                    <a href="">О нас</a>
                    <a href="">Отзывы</a>
                    <a href="">Обратная связь</a>
                </div>
                <div className={style.NavigateButton}>
                    <button className={style.ButtonAuth} onClick={handleLoginClick}>Войти</button>
                    <button className={style.ButtonReg} onClick={handleRegisterClick}>Регистрация</button>
                </div>
            </section>
        </>
    )
}
