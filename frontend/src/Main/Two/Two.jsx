import style from './Two.module.css'

export default function Two({className}){
    return (
        <>
            <section className={`${className} ${style.Two}`}>
                <section className={style.HeaderText}>
                    <h1 className={style.Twoh1}>Что вы получите при<br /><span className={style.Twoh1span}>работе с Avis?</span></h1>
                    <p className={style.TwoHeaderP}>Avis — это студия разработчиков, специально созданная для того, чтобы вы могли воплощать свои<br />идеи в реальные продукты быстро, качественно и просто. Мы предлагаем различные подходы к<br />реализации ваших идей на разных языках программирования и создаем красивые дизайны.</p>
                </section>
                <section></section>
            </section>
        </>
    )
}