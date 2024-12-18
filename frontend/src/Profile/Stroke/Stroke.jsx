import style from './Stroke.module.css';

export default function Stroke({ onClick }) {
    return (
        <>
            <section className={style.Stroke}>
                <div className={style.NameFormul}>Text</div>
                <div className={style.ExportFile}>Docx</div>
                <div className={style.Analizator} onClick={onClick}>
                    Click
                </div>
            </section>
        </>
    );
}
