import style from './Register.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tg from '/tg.svg'
import axios from 'axios'

export default function Register(){
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (!login || !password || !email || !repeatPassword) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }

        if (password !== repeatPassword){
            setError('Пароли не совпадают!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
              email,
              login,
              password,
            });
      
            alert(response.data.message);
            navigate('/login');
          } catch (error) {
            setError(error.response?.data?.message || 'Ошибка при регистрации');
        }
    }

    const handleCheckboxChange = () => {
        setShowPassword(prevState => !prevState);
    };

    return(
        <>
            <section className={style.Login}>
                <div className={style.FormLogin}>
                    <h2 className={style.LoginH2}>Регистрация</h2>
                    <a className={style.RegisterA} href="/login">Авторизация</a>
                    <form className={style.LoginForm} onSubmit={handleSubmit}>
                        <div className={style.LabelLoginForm}>
                            <div className={style.FormGroup}>
                                <label className={style.Label} htmlFor="email">E-mail</label>
                                <input className={style.Input}
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={style.FormGroup}>
                                <label className={style.Label} htmlFor="login">Логин</label>
                                <input className={style.Input}
                                    type="text"
                                    id="login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </div>
                            <div className={style.FormGroup}>
                                <label className={style.Label} htmlFor="password">Придумайте пароль</label>
                                <input className={style.Input}
                                    type = {showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className={style.FormGroup}>
                                <label className={style.Label} htmlFor="repeatPassword">Повторите пароль</label>
                                <input className={style.Input}
                                    type = {showPassword ? 'text' : 'password'}
                                    id="repeatPassword"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <label className={style.OpenPassword}><input type="checkbox" checked={showPassword} onChange={handleCheckboxChange}/><p>Показать пароль</p></label>
                        <label className={style.Agreements}><input type="checkbox"/><p>Я принимаю условия <a href="">соглашения о пользовании<br />информационными системами</a> и ознакомлен <a href="">политикой в<br />отношении обработки персональных данных</a></p></label>
                        <div className={style.FooterLogin}>
                            <button type="submit" className={style.LoginBtn}>Зарегистрироваться</button>
                            <div className={style.FrameLogin}>
                                <div className={style.LineLogin}></div>
                                <p>или</p>
                                <div className={style.LineLogin}></div>
                            </div>
                            <div className={style.FormGroup}>
                                <label className={style.Label} htmlFor="telegram">Зарегистрируйтесь через</label>
                                <button className={style.TelegramLogin} type='submit' id='telegram'><img src={tg} className={style.TgImg} />Telegram</button>
                            </div>
                        </div>
                    </form>
                </div>
                {error && <p className={style.ErrorMessage}>{error}</p>}
            </section>
        </>
    )
}