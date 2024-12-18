import style from './Box.module.css';

export default function Box({ config }) {
    return (
        <div className={style.PodCard}>
            {config.map((item, index) => (
                <div key={index} className={style.Box}>
                    <div className={style.Grid} style={{background: item.background}}>
                        {item.img && <img src={item.img} alt={item.header} className={style.Image} />}
                    </div>
                    <div className={style.TextAll}>
                        <div className={style.Header}>{item.header}</div>
                        <div className={style.Text}>{item.text}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
